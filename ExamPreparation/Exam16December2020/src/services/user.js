const User = require('../models/User.js');

async function createUser(username, hashedPassword) {
    const user = new User({ username, hashedPassword });

    await user.save();

    return user;
}

async function getUserByUsername(username, password) {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: pattern } });
    return user;
}

module.exports = {
    createUser,
    getUserByUsername
}