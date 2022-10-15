const router = require('express').Router();
const { register } = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {
    res.render('auth/register');
});

router.post('/register', async (req, res) => {
    const { name, username, password, rePassword } = req.body;

    await register({
        name,
        username,
        password,
        rePassword
    });

    res.redirect('/');
});

module.exports = router;