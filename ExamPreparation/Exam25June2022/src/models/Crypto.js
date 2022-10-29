const mongoose = require('mongoose');

const cryptoSchema = mongoose.Schema({
    name: {
        type: String,
        min: [2, 'Name should be at least 2 characters long'],
        required: true
    },
    image: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    price: {
        type: Number,
        validate: (priceValue) => {
            if (priceValue <= 0) {
                throw new Error('Price should be positive number!');
            }
        },
        required: true
    },
    description: {
        type: String,
        min: [10, 'Name should be at least 10 characters long'],
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: true
    },
    buyCrypto: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Crypto', cryptoSchema);