const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/', (req, res) => {
    res.render('housing');
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    const housing = await housingService.create(req.body);

    res.redirect('/');
});

module.exports = router;