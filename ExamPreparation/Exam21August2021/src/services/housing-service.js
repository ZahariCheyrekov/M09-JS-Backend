const { Housing } = require('../models/Housing');


exports.getTopHousings = async () => {
    try {
        const housings = await Housing.find().sort({ createdAt: -1 }).limit(3).lean();
        return housings
    } catch (error) {

    }
}

exports.create = async (housingData) => {
    try {
        return await Housing.create(housingData);
    } catch (error) {

    }
}