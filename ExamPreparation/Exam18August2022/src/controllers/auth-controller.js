const router = require('express').Router();

const { COOKIE_NAME } = require('../constants');
const authService = require('../services/auth-service');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const token = await authService.login({ email, password });

        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    if (req.password !== req.rePassword) {
        res.locals.errors = 'Password mismatch!';
        res.render('auth/register');
    }

    try {
        await authService.register(req.body);

        const token = await authService.login({ email, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

router.get('/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;