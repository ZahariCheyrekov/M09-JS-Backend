const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET } = require('../config/env');
const { NO_USERNAME_OR_PASSWORD_MESSAGE } = require('../constants/authContstants');

exports.create = (userData) => User.create(userData);

exports.login = async (username, password) => {
    const user = await User.findOne({ username });

    if (!user) {
        throw { message: NO_USERNAME_OR_PASSWORD_MESSAGE }
    }

    const isValid = bcrypt.compare(password, user.password);
    if (!isValid) {
        throw { message: NO_USERNAME_OR_PASSWORD_MESSAGE }
    }

    return user;
}

exports.createToken = (user) => {
    const payload = { _id: user._id, username: user.username, address: user.address };
    const options = { expiresIn: '2d' };

    const tokenPromise = new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET, options, (err, decodedToken) => {
            if (err) {
                return reject(err);
            }

            resolve(decodedToken);
        });
    });

    return tokenPromise;
}