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
}

exports.register = async (userData) => {
    await User.create(userData);
}