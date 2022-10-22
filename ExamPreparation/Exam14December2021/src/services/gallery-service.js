const Publication = require('../models/Publication');
const User = require('../models/User');

exports.getOne = async (publicationId) => {
    return await Publication.findById(publicationId);
}

exports.getPublicationTitle = async (publicationId) => {
    const { title } = await this.getOne(publicationId);
    return title;
}

exports.getAll = async () => {
    return await Publication.find().lean();
}

exports.getUserPublications = async (userId) => {
    const publications = await Publication.find({ usersShared: { $in: userId } });

    const titles = [];

    for (const publication of publications) {
        titles.push(publication.title);
    }

    return titles.join(', ');
}

exports.createPublication = async (userId, publicationData) => {
    const publication = await Publication.create(publicationData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { myPublications: publication._id } },
        { runValidators: true }
    );
}

exports.sharePublication = async (publicationId, userId) => {
    return await Publication.findByIdAndUpdate(
        { _id: publicationId },
        { $push: { usersShared: userId } },
        { runValidators: true }
    );
}

exports.editPublication = async (publicationId, publicationData) => {
    return await Publication.findByIdAndUpdate(publicationId, publicationData);
}

exports.deletePublication = async (publicationId) => {
    return await Publication.findByIdAndDelete(publicationId);
}