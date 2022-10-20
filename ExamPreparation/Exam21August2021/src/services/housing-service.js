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
        return Housing.create(housingData);
    } catch (error) {

    }
}

exports.addTenant = (housingId, tenantId) => {
    try {
        return Housing.findOneAndUpdate(
            { _id: housingId },
            {
                $push: { tenants: tenantId },
                $inc: { availablePieces: -1 }
            });
    } catch (error) {

    }
}

exports.delete = async (housingId) => {
    try {
        await Housing.findByIdAndDelete(housingId);
    } catch (error) {

    }
}

exports.edit = async (housingId, housingData) => {
    try {
        await Housing.findByIdAndUpdate(housingId, housingData);
    } catch (error) {

    }
}