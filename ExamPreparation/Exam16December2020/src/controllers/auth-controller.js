const router = require('express').Router();

const { COOKIE_NAME } = require('../constants');
const { isGuest, isAuth } = require('../middlewares/auth-middleware');
const authService = require('../services/auth-service');

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { username, password } = req.body;

    if (req.password !== req.rePassword) {
        res.locals.errors = 'Password mismatch!';
        res.render('auth/register');
    }

    try {
        await authService.register(req.body);

        const token = await authService.login({ username, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;