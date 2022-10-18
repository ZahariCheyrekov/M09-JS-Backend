const bcrypt = require('bcrypt');

const userService = require('../services/user-service');

function init() {
    return function (req, res, next) {

        next();
    }
}

async function register(username, password) {
    const existingUser = await userService.getUserByUsername(username);

    if (existingUser) {
        throw new Error('Username is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, hashedPassword);
}

async function login(username, password) {

}