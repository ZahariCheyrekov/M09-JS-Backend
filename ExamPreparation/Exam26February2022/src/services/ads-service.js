const Ad = require('../models/Ad');
const User = require('../models/User');

const userService = require('./auth-service');

exports.getAd = async (adId) => {
    return await Ad.findById(adId);
}

exports.getAll = async () => {
    return await Ad.find().lean();
}

exports.getTopAds = async () => {
    return await Ad.find().sort({ createdAt: -1 }).limit(3).lean();
}

exports.getAdsByEmail = async (email) => {
    return await Ad.find({ author: email }).lean();
}

exports.getUsersApplied = async (adId) => {
    const ad = await this.getAd(adId);
    const usersApplied = ad.usersApplied;

    const users = [];

    for (const user of usersApplied) {
        const { email, description } = await userService.getUser(user);

        users.push({ email, description });
    }
    
    return users;
}

exports.create = async (userId, adData) => {
    const add = await Ad.create(adData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { myAds: add._id } },
        { runValidators: true }
    );
}

exports.applyForJob = async (adId, userId) => {
    return await Ad.findByIdAndUpdate(
        { _id: adId },
        { $push: { usersApplied: userId } },
        { runValidators: true }
    );
}

exports.editAd = async (adId, adData) => {
    return await Ad.findByIdAndUpdate(adId, adData);
}

exports.deleteAd = async (adId) => {
    return await Ad.findByIdAndDelete(adId);
}