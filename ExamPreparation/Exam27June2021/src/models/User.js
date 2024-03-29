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
        min: [4, 'Password must be at least 4 characters long!'],
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    tripsHistory: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Trip'
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