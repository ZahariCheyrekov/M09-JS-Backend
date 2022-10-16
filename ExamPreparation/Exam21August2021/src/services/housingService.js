const Housing = require("../models/Housing");

exports.create = async (housingData) => {
    return await Housing.create(housingData);
}