const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const { JWT_SECRET } = require('../constants');

exports.getUser = async (userId) => {
    return await User.findById(userId);
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('User doesn\'t exist');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    const payload = {
        _id: user.id,
        username: user.username,
        email: user.email
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

exports.register = async (userData) => {
    await User.create(userData);
}