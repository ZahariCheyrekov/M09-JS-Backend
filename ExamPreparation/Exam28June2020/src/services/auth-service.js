const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../constants');
const User = require('../models/User');

exports.getUser = async (userId) => {
    return await User.findById(userId);
}

exports.login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user.id,
        username: user.username,
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

exports.register = async (userData) => {
    await User.create(userData);
}