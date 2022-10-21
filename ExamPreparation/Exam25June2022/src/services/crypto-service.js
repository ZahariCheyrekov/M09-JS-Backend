const Crypto = require('../models/Crypto');

exports.getCoin = async (coinId) => {
    return await Crypto.findById(coinId);
}

exports.getAllCoins = async () => {
    return await Crypto.find().lean();
}

exports.getCoinsByWallet = async (paymentMethod) => {
    return await Crypto.find({ paymentMethod: { $regex: paymentMethod, $options: 'i' } }).lean();
}

exports.create = async (cryptoData) => {
    await Crypto.create(cryptoData);
}

exports.buyCoin = async (coinId, userId) => {
    await Crypto.findByIdAndUpdate(
        { _id: coinId },
        { $push: { buyCrypto: userId } },
        { runValidators: true }
    );
}

exports.editCoin = async (coinId, coinData) => {
    await Crypto.findByIdAndUpdate(coinId, coinData);
}

exports.deleteCoin = async (coinId) => {
    await Crypto.findByIdAndDelete(coinId);
}