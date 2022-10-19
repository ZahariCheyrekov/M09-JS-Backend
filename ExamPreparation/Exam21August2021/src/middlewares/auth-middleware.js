const jwt = require('../utils/jwt');

const { COOKIE_NAME, JWT_SECRET } = require('../constants');

exports.auth = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME];

    if (token) {
        jwt.verify(token, JWT_SECRET)
            .then(decodedToken => {
                req.user = decodedToken;
                next();
            })
            .catch(err => {
                res.clearCookie(COOKIE_NAME);
                res.redirect('/auth/login')
                // res.status(401).render('404');
            });
    } else {
        next();
    }
}