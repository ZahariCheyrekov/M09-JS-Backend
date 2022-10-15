const router = require('express').Router();
const { AUTH_COOKIE_NAME } = require('../constants.js');
const { login, register } = require('../services/authService.js');

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await login({ username, password });

        res.cookie(AUTH_COOKIE_NAME, token);

        res.redirect('/');
    } catch (error) {
        console.log(error);
    }
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