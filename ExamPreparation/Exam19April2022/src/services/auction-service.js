const Auction = require('../models/Auction');

exports.getAll = async () => {
    return await Auction.find().lean();
}

exports.create = async (auctionData) => {
    return await Auction.create(auctionData);
}