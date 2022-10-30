const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: [2, 'Username should be at least 2 characters long'],
        required: [true, 'Username is required'],
        unique: [true, 'Username already exist']
    },
    email: {
        type: String,
        required: [true, 'Emai is required'],
        minLength: [10, 'Email should be at least 10 characters long'],
        unique: [true, 'Email is already in use']
    },
    password: {
        type: String,
        minLength: [4, 'Password should be at least 4 characters long'],
        required: [true, 'Password is required']
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

exports.User = mongoose.model('User', userSchema);