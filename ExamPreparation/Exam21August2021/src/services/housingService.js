const Housing = require("../models/Housing");

exports.getAll = async () => {
    return await Housing.find().lean();
}

exports.create = async (housingData) => {
    return await Housing.create(housingData);
}

exports.getTopHouses = async () => {
    return await Housing.find().sort({ createdAt: -1 }).limit(3).lean();
}