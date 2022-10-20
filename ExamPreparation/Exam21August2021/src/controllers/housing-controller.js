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
    let housing = await housingService.getHousing(req.params.housingId);

    const isOwner = String(housing.owner) === req.user?._id;
    const isAvailable = housing.availablePieces > 0;
    const isRented = housing.tenants.some(tenant => String(tenant._id) === req.user._id);

    const tenants = housing.getTenants();

    const housingData = housing.toObject();

    res.render('housing/details', { ...housingData, isOwner, isAvailable, isRented, tenants });
});

router.get('/:housingId/rent', async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user._id);

    res.redirect(`/housing/${req.params.housingId}/details`);
});

module.exports = router;