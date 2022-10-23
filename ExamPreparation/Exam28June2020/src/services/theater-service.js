const Play = require('../models/Play');
const User = require('../models/User');

exports.getOne = async (theaterId) => {
    return await Play.findById(theaterId);
}

exports.getTopTheaters = async () => {
    return await Play.find().sort({ usersLiked: -1 }).limit(3).lean();
}

exports.getTheatersByDate = async () => {
    return await Play.find().sort({ createdAt: -1 }).lean();
}

exports.getTheatersByLikes = async () => {
    return await Play.find().sort({ usersLiked: -1, createdAt: -1 }).lean();
}

exports.getAll = async () => {
    return await Play.find({ isPublic: true }).sort({ createdAt: -1 }).lean();
}

exports.createTheater = async (theaterData) => {
    return await Play.create(theaterData);
}

exports.likeTheater = async (userId, theaterId) => {
    const theater = await Play.findByIdAndUpdate(
        { _id: theaterId },
        { $push: { usersLiked: userId } },
        { runValidators: true }
    );

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { likedPlays: theater._id } },
        { runValidators: true }
    )
}

exports.editTheater = async (theaterId, theaterData) => {
    return await Play.findByIdAndUpdate(theaterId, theaterData);
}

exports.deleteTheater = async (theaterId) => {
    return await Play.findByIdAndDelete(theaterId);
}