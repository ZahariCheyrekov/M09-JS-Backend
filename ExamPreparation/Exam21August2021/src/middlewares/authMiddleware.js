const jwt = require('../utils/jwt.js');
const { AUTH_COOKIE_NAME, JWT_SECRET } = require("../constants")

exports.auth = (req, res, next) => {
    const token = req.cookie[AUTH_COOKIE_NAME];

    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(AUTH_COOKIE_NAME);
                res.redirect('/auth/ogin');
            });
    } else {
        next();
    }
}

exports.isAuth = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.redirect('/auth/login');
    }
}