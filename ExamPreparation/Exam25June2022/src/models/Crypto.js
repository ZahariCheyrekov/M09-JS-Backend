const mongoose = require('mongoose');

const cryptoSchema = mongoose.Schema({
    name: {
        type: String,
        min: [2, 'Must be at least 2 characters long!'],
        required: [true, 'Name field is required!']
    },
    image: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    price: {
        type: Number,
        minLength: 5,
        validate: (priceAmount) => {
            if (Number(priceAmount) <= 0) {
                throw new Error("Price must be positive number!");
            }
        }
    },
    description: {
        type: String,
        minLength: 10,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['crypt-wallet', 'credit-card', 'debit-card', 'paypal'],
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