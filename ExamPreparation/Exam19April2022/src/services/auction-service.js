const Auction = require('../models/Auction');

exports.getAuction = async (auctionId) => {
    return await Auction.findById(auctionId);
}

exports.getAll = async () => {
    return await Auction.find().lean();
}

exports.create = async (auctionData) => {
    return await Auction.create(auctionData);
}

exports.deleteAuction = async (auctionId) => {
    return await Auction.findByIdAndDelete(auctionId);
}