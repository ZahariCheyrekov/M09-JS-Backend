const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: [5, 'The name should be at least 5 characters long.'],
        required: true
    },
    bookedHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel'
        }
    ],
    offeredHotels: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Hotel'
        }
    ]
});

userSchema.pre('save', function (next) {
    return bcrypt.hash(this.password, SALT_ROUNDS)
        .then((hash) => {
            this.password = hash;
            next();
        });
});

userSchema.method('validatePassword', async function (pass) {
    return await bcrypt.compare(pass, this.password);
});

module.exports = mongoose.model('User', userSchema);