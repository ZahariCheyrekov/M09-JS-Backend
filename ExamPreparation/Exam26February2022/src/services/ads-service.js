const Ad = require('../models/Ad');

exports.getAll = async () => {
    return await Ad.find();
}

exports.create = async (adData) => {
    return await Ad.create(adData);
}