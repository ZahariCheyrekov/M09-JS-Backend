const Publication = require('../models/Publication');
const User = require('../models/User');

exports.getAll = async () => {
    return await Publication.find().lean();
}

exports.createPublication = async (userId, publicationData) => {
    const publication = await Publication.create(publicationData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { myPublications: publication._id } },
        { runValidators: true }
    )
}