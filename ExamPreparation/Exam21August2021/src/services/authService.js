const jwt = require('../utils/jwt');
const util = require('util');
const { JWT_SECRET } = require('../constants.js');
const User = require('../models/User.js');

exports.login = async ({ username, password }) => {
    const user = await User.find({ username });

    if (!user) {
        throw new Error('Invalid username and password!');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid username or password!');
    }

    const payload = {
        _id: user._id,
        name: user.name,
        username: user.username
    }

    const token = await jwt.sign(payload, JWT_SECRET);
    return token;
}

exports.register = async (userData) => {
    await User.create(userData);
}