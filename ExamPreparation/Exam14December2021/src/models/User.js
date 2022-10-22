const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { SALT_ROUNDS } = require('../constants');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    myPublications: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Publication'
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