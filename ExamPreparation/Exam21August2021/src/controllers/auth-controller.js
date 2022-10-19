const router = require('express').Router();

const authService = require('../services/auth-service');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {

    if (req.password !== req.rePassword) {
        res.locals.errors = 'Password mismatch!';
        res.render('auth/register');
    }

    await authService.register(req.body);

    res.redirect('/');
});

module.exports = router;