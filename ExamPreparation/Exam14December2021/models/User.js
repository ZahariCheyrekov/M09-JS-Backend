const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../config/env');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

userSchema.pre('save', function () {
    bcrypt.hash(this.password, SALT_ROUNDS);
    this.password = hashedPassword;
});

const User = mongoose.model('User', userSchema);
module.exports = User;