const Ad = require('../models/Ad');

exports.getAll = async () => {
    return await Ad.find().lean();
}

exports.create = async (adData) => {
    return await Ad.create(adData);
}