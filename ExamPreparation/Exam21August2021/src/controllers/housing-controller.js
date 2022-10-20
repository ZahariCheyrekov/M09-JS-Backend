const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('housing');
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

module.exports = router;