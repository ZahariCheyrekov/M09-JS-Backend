const router = require('express').Router();

const { COOKIE_NAME } = require('../constants');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', (req, res) => {

});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', (req, res) => {

});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;