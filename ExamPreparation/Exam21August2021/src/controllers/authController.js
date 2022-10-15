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

    if (password !== rePassword) {
        res.locals.error = 'Passwords must match!';

        return res.render('auth/register');
    }

    await register({
        name,
        username,
        password,
        rePassword
    });

    res.redirect('/');
});

module.exports = router;