const Play = require('../models/Play');

exports.getOne = async (theaterId) => {
    return await Play.findById(theaterId);
}

exports.getTopTheaters = async () => {
    return await Play.find().sort({ usersLiked: -1 }).limit(3).lean();
}

exports.getAll = async () => {
    return await Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}

exports.createTheater = async (theaterData) => {
    return await Play.create(theaterData);
}

exports.deleteTheater = async (theaterId) => {
    return await Play.findByIdAndDelete(theaterId);
}