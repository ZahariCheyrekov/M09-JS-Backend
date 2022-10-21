const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    email: {
        type: String,
        validate: (email) => {
            const regex = /\b(?<name>[A-Za-z]+)\@(?<domain>[A-Za-z]+)\.(?<extension>[A-Za-z]+)\b/g
            if (!email.match(regex)) {
                throw new Error('The email should be in format: <name>@<domain>.<extension>. Example: "petar@softuni.bg"');
            }
        },
        required: true
    },
    password: {
        type: String,
        min: [5, 'Password should be at least 5 characters long.'],
        required: true
    },
    description: {
        type: String,
        max: [40, 'Description should be maximum 50 characters long.'],
        required: true
    },
    myAds: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Ad'
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