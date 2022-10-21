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
        min: [5, 'The password should be at least 5 characters long'],
        required: true
    },
    firstName: {
        type: String,
        min: [1, 'First name should be at least 1 character long'],
        required: true
    },
    lastName: {
        type: String,
        min: [1, 'Last name should be at least 1 character long'],
        required: true
    }
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