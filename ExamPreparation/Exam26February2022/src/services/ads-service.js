const Ad = require('../models/Ad');
const User = require('../models/User');

exports.getAd = async (adId) => {
    return await Ad.findById(adId);
}

exports.getAll = async () => {
    return await Ad.find().lean();
}

exports.getTopAds = async () => {
    return await Ad.find().sort({ createdAt: -1 }).limit(3).lean();
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