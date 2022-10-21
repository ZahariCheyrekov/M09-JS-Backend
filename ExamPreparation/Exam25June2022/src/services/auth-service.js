const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../constants');
const User = require('../models/User');

exports.login = async ({ email, password }) => {
    try {
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
            email: user.email
        }

        const token = jwt.sign(payload, JWT_SECRET);
        return token;

    } catch (error) {
        console.log(error);
    }
}

exports.register = async (userData) => {
    try {
        await User.create(userData);
    } catch (error) {
        console.log(error);
    }
}