const Crypto = require('../models/Crypto');

exports.getAllCoins = async () => {
    try {
        return await Crypto.find().lean();
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