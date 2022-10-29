const Crypto = require('../models/Crypto');

exports.createCrypto = async (cryptoData) => {
    return await Crypto.create(cryptoData);
}