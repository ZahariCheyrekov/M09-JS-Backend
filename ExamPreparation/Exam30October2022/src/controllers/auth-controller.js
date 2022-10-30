const router = require('express').Router();

const authService = require('../services/auth-service');
const { COOKIE_NAME } = require('../constants');
const { isAuth } = require('../guards/isAuth');
const { isGuest } = require('../guards/isGuest');
const { validatePassword } = require('../validation/validate-password');
const { ALL_FIELDS_ARE_REQUIRED } = require('../messages')

router.get('/login', isGuest, (req, res) => {
    res.render('auth/login');
});

router.post('/login', isGuest, async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === '' || password === '') {
            throw new Error(ALL_FIELDS_ARE_REQUIRED);
        }

        const token = await authService.login({ email, password });

        if (!token) {
            throw new Error('Invalid credentials');
        }

        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        const errors = [];

        if (error.errors) {
            for (const { properties } of Object.values(error.errors)) {
                errors.push({ 'error': properties.message });
            }
        }

        if (error.message) {
            errors.push({ 'error': error.message });
        }

        res.render('auth/login', { errors });
    }
});

router.get('/register', isGuest, (req, res) => {
    res.render('auth/register');
});

router.post('/register', isGuest, async (req, res) => {
    const { email, password } = req.body;

    const isValidPassword = validatePassword(req.password, req.rePassword);

    if (!isValidPassword) {
        res.locals.errors = 'Passwords must be equal!';
        res.render('auth/register');
    }

    try {
        await authService.register(req.body);

        const token = await authService.login({ email, password });

        res.cookie(COOKIE_NAME, token);
        res.redirect('/');

    } catch (error) {
        const errors = [];

        if (error.errors) {
            for (const { properties } of Object.values(error.errors)) {
                errors.push({ 'error': properties.message });
            }
        }

        if (error.message) {
            errors.push({ 'error': error.message });
        }

        res.render('auth/register', { errors });
    }
});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
});

module.exports = router;