const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT } = require('../constants.js');

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
        .then((hash) => {
            this.password = hash;
            return next();
        });
});

userSchema.method('validatePassword', (password) => {
    return bcrypt.compare(password, this.password);
});

const User = mongoose.model('User', userSchema);
module.exports = User;