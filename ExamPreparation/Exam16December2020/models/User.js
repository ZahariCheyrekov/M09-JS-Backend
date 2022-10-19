const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userSchema: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);