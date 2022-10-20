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
    const housing = await housingService.create({ ...req.body, owner: req.user._id });

    res.redirect('/housing');
});

module.exports = router;