const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const housingService = require('../services/housing-service');

const isOwner = async (req, res, next) => {
    const housing = await housingService.getHousing(req.params.housingId);

    if (String(housing.owner) === req.user._id) {
        res.redirect(`/housing/${req.params.housingId}/details`);
    } else {
        next();
    }
}

const isntOwner = async (req, res, next) => {
    const housing = await housingService.getHousing(req.params.housingId);

    if (String(housing.owner) !== req.user._id) {
        next();
    } else {
        res.redirect(`/housing/${req.params.housingId}/details`);
    }
}

router.get('/', async (req, res) => {
    const housings = await housingService.getAll();

    res.render('housing', { housings });
});

router.get('/create', isAuth, (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await housingService.create({ ...req.body, owner: req.user._id });

        res.redirect('/housing');
    } catch (error) {
        res.render('housing/create', { error: error.message });
    }
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

router.get('/:housingId/rent', isOwner, async (req, res) => {
    await housingService.addTenant(req.params.housingId, req.user._id);

    if (req.params)

        res.redirect(`/housing/${req.params.housingId}/details`);
});

router.get('/:housingId/delete', isntOwner, async (req, res) => {
    await housingService.delete(req.params.housingId);

    res.redirect('/housing');
});

router.get('/:housingId/edit', isntOwner, isntOwner, async (req, res) => {
    const housing = await housingService.getHousing(req.params.housingId);

    res.render('housing/edit', { ...housing.toObject() });
});

router.post('/:housingId/edit', isntOwner, async (req, res) => {
    await housingService.edit(req.params.housingId, req.body);

    res.redirect(`/housing/${req.params.housingId}/details`);
});


module.exports = router;