const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT } = require('../constants');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

userSchema.pre('save', (next) => {
    return bcrypt.hash(this.password, SALT)
        .then(hash => {
            this.password = hash;
            next();
        });
});

const User = mongoose.model('User', userSchema);
module.exports = User;