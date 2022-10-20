const { Housing } = require('../models/Housing');

exports.create = async (housingData) => {
    try {
        return await Housing.create(housingData);
    } catch (error) {

    }
}