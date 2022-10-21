const Ad = require('../models/Ad');

exports.getAll = async () => {
    return await Ad.find().lean();
}

exports.getTopAds = async () => {
    return await Ad.find().sort({ createdAt: -1 }).limit(3).lean();
}

exports.create = async (adData) => {
    return await Ad.create(adData);
}