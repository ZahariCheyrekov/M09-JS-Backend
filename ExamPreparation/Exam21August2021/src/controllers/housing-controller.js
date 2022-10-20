const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/', async (req, res) => {
    const housings = await housingService.getAll();

    res.render('housing', { housings });
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', async (req, res) => {
    console.log(req.body);
    const housing = await housingService.create({ ...req.body, owner: req.user._id });

    res.redirect('/housing');
});

router.get('/:housingId/details', async (req, res) => {
    const housing = await housingService.getHousing(req.params.housingId);

    const isOwner = String(housing.owner) === req.user?._id;

    res.render('housing/details', { ...housing, isOwner });
});

module.exports = router;