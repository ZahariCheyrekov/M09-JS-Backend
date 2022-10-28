const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: [4, 'Username should be at least 4 characters long'],
        required: true
    },
    email: {
        type: String,
        min: [10, 'Username should be at least 10 characters long'],
        required: true
    },
    password: {
        type: String,
        min: [3, 'Username should be at least 3 characters long'],
        required: true
    },
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