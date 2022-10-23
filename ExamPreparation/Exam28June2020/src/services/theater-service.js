const Play = require('../models/Play');

exports.getTopTheaters = async () => {
    return await Play.find().sort({ usersLiked: -1 }).limit(3).lean();
}

exports.getAll = async () => {
    return await Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}
