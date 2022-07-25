const router = require('express').Router();

router.get('/create', (req, res) => {
    res.render('publication/create')
});

module.exports = router;