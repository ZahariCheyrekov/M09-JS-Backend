const mongoose = require('mongoose');

const auctionSchema = mongoose.Schema({
    title: {
        type: String,
        min: [4, 'Title should be at least 4 charactes long'],
        required: true
    },
    description: {
        type: String,
        max: [200, 'Description should be maximum 200 charactes long']
    },
    category: {
        type: String,
        enum: ['vehicles', 'estate', 'electronics', 'furniture', 'other'],
        required: true
    },
    imageUrl: {
        type: String
    },
    price: {
        type: Number,
        validate: (priceAmount) => {
            if (Number(priceAmount) <= 0) {
                throw new Error('Price cannot be negative');
            }
        },
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    bidder: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    }
});

module.exports = mongoose.model('Auction', auctionSchema);