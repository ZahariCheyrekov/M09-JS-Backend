const router = require('express').Router();

router.get('/', (req, res) => {
    res.locals.title = 'Home Page';
    res.render('home');
});

module.exports = router;