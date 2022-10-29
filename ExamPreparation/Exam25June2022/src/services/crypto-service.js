const Crypto = require('../models/Crypto');

exports.getAll = async () => {
    return await Crypto.find().lean();
}

exports.createCrypto = async (cryptoData) => {
    return await Crypto.create(cryptoData);
}