const { Housing } = require('../models/Housing');

exports.getHousing = async (housingId) => {
    try {
        const housing = await Housing.findById(housingId).populate('tenants');
        return housing;
    } catch (error) {

    }
}

exports.getAll = async () => {
    try {
        const housings = await Housing.find().lean();
        return housings;
    } catch (error) {

    }
}

exports.getTopHousings = async () => {
    try {
        const housings = await Housing.find().sort({ createdAt: -1 }).limit(3).lean();
        return housings;
    } catch (error) {

    }
}

exports.create = async (housingData) => {
    try {
        return await Housing.create(housingData);
    } catch (error) {

    }
}