const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { TOKEN_SECRET, COOKIE_NAME } = require('../config/index.js');
const userService = require('../services/user.js');

module.exports = (req, res, next) => {
    req.auth = {
        async register(username, password) {
            const token = await register(username, password);
            res.cookies(COOKIE_NAME, token);
        },
        async login() {
            const token = await login(username, password);
            res.cookies(COOKIE_NAME, token);
        },
        logout() {
            res.clearCookie(COOKIE_NAME);
        }
    }
    next();
}

async function register(username, password) {
    const existingUser = await userService.getUserByUsername(username);

    if (existingUser) {
        throw new Error('Username is already taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userService.createUser(username, hashedPassword);

    return generateToken(user);
}

async function login(username, password) {
    const user = await userService.createUser(username);

    if (!user) {
        throw new Error('No such user');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Invalid password!');
    }

    return generateToken(user);
}

function generateToken(userData) {
    return jwt.sign({
        _id: userData._id,
        username: userData.username
    }, TOKEN_SECRET);
}