const Auction = require('../models/Auction');

exports.getAll = async () => {
    return await Auction.find().lean();
}