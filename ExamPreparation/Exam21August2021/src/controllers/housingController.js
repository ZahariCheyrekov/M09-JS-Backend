const router = require('express').Router();

const housingService = require('../services/housingService.js');
const { isAuth } = require('../middlewares/authMiddleware.js');

router.get('/', async (req, res) => {
    const housings = await housingService.getAll();

    res.render('housing', { housings });
});

router.get('/create', (req, res) => {
    res.render('housing/create');
});

router.post('/create', isAuth, async (req, res) => {
    await housingService.create({ ...req.body, owner: req.user._id });

    res.redirect('/housing');
});

router.get('/:housingId/details', async (req, res) => {
    const housing = await housingService.getOne(req.params.housingId);
    const isOnwer = String(housing.owner) === req.user?._id;

    const tenants = housing.getTenants();
    const housingData = await housing.toObject();
    const isAvailable = housing.availablePieces > 0;
    const isRented = housing.tenants.some(tenant => tenant._id === req.user._id);

    res.render('housing/details', { ...housingData, isOnwer, tenants, isAvailable, isRented });
});



module.exports = router;