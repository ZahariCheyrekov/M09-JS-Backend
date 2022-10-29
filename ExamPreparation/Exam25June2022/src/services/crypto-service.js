const Crypto = require('../models/Crypto');

exports.getOne = async (cryptoId) => {
    return await Crypto.findById(cryptoId);
}

exports.getCoinsPayment = async (name, paymentMethod) => {
    return await Crypto
        .find({ name: { $regex: name, $options: 'i' } })
        .find({ paymentMethod: { $regex: paymentMethod, $options: 'i' } })
        .lean();
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

exports.editCrypto = async (cryptoId, cryptoData) => {
    return await Crypto.findByIdAndUpdate(cryptoId, cryptoData);
}

exports.deleteCrypto = async (cryptoId) => {
    return await Crypto.findByIdAndDelete(cryptoId);
}