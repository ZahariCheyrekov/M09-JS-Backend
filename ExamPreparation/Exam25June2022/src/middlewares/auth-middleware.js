const jwt = require('../utils/jwt');

const { COOKIE_NAME, JWT_SECRET } = require('../constants');

exports.auth = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];

    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                res.locals.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(COOKIE_NAME);
                res.redirect('/auth/login')
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

exports.isGuest = (req, res, next) => {
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
}