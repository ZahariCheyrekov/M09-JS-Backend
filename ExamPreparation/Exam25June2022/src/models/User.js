const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: [5, 'Username should be at least 5 characters long'],
        required: true
    },
    email: {
        type: String,
        min: [10, 'Email should be at least 10 characters long'],
        required: true
    },
    password: {
        type: String,
        min: [4, 'Password should be at least 4 characters long'],
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

exports.User = mongoose.model('User', userSchema);