const jwt = require('jsonwebtoken');

const { User } = require('../models/User');
const { JWT_SECRET } = require('../constants');

exports.login = async ({ username, password }) => {
    try {
        const user = await User.findOne({ username });

        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isValid = await user.validatePassword(password);

        if (!isValid) {
            throw new Error('Invalid username or password');
        }

        const payload = {
            _id: user.id,
            name: user.name,
            username: user.username
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