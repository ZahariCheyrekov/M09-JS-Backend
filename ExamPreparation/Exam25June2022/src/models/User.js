const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        minLength: 5,
        required: true
    },
    email: {
        type: String,
        minLength: 10,
        required: true
    },
    password: {
        type: String,
        minLength: 4,
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