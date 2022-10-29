const Crypto = require('../models/Crypto');

exports.getOne = async (cryptoId) => {
    return await Crypto.findById(cryptoId);
}

exports.getAll = async () => {
    return await Crypto.find().lean();
}

exports.createCrypto = async (cryptoData) => {
    return await Crypto.create(cryptoData);
}

exports.buyCrypto = async (cryptoId, userId) => {
    return await Crypto.findByIdAndUpdate(
        { _id: cryptoId },
        { $push: { buyCrypto: userId } },
        { runValidators: true }
    );
}