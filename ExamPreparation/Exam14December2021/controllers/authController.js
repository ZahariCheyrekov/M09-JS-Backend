const router = require('express').Router();

router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/register', (req, res) => {

});

module.exports = router;