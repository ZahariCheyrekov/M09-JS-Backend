const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
});

userSchema.pre('save', function () {
    this.password = hashedPassword;
});

const User = mongoose.model('User', userSchema);
module.exports = User;