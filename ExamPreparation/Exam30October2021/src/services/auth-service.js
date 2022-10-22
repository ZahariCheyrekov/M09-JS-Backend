const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../constants');
const User = require('../models/User');

exports.getUser = async (userId) => {
    return await User.findById(userId);
}

exports.getUserEmail = async (userId) => {
    const { email } = await this.getUser(userId);
    return email;
}

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password');
    }

    const payload = {
        _id: user.id,
        email: user.email,
    }

    const token = jwt.sign(payload, JWT_SECRET);
    return token;
}

exports.register = async (userData) => {
    await User.create(userData);
}