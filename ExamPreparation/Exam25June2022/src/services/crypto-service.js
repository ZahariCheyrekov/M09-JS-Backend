const Crypto = require('../models/Crypto');

exports.getCoin = async (coinId) => {
    try {
        return await Crypto.findById(coinId);
    } catch (error) {
        console.log(error);
    }
}

exports.getAllCoins = async () => {
    try {
        return await Crypto.find().lean();
    } catch (error) {
        console.log(error);
    }
}

exports.getCoinsByWallet = async (paymentMethod) => {
    try {
        return await Crypto.find({ paymentMethod: { $regex: paymentMethod, $options: 'i' } }).lean();
    } catch (error) {
        console.log(error);
    }
}

exports.create = async (cryptoData) => {
    try {
        await Crypto.create(cryptoData);
    } catch (error) {
        console.log(error);
    }
}

exports.buyCoin = async (coinId, userId) => {
    try {
        await Crypto.findByIdAndUpdate(
            { _id: coinId },
            { $push: { buyCrypto: userId } },
            { runValidators: true }
        );
    } catch (error) {
        console.log(error);
    }
}

exports.editCoin = async (coinId, coinData) => {
    try {
        await Crypto.findByIdAndUpdate(coinId, coinData);
    } catch (error) {
        console.log(error);
    }
}

exports.deleteCoin = async (coinId) => {
    try {
        await Crypto.findByIdAndDelete(coinId);
    } catch (error) {
        console.log(error);
    }
}