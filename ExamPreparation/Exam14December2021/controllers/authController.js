const router = require('express').Router();
const authService = require('../services/authService');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { password, repeatPassword, ...userData } = req.body;

    if (password !== repeatPassword) {
        return res.render('auth/register', { error: 'Password mismatch' });
    }

    try {
        await authService.create({ password, ...userData });
        res.redirect('/login');
    } catch (error) {
        return res.render('auth/register', { error: 'db error' });
    }
});

module.exports = router;