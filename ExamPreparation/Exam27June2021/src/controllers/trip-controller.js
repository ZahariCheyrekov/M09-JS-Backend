const router = require('express').Router();

const tripService = require('../services/trip-service');

router.get('/', async (req, res) => {
    const trips = await tripService.getTrips();

    res.render('trip', { trips });
});

router.get('/offer', async (req, res) => {
    res.render('trip/offer');
});

router.post('/offer', async (req, res) => {
    try {
        await tripService.createTrip(req.user._id, { ...req.body, creator: req.user._id });
        res.redirect('/trip');

    } catch (error) {
        const err = Object.values(error.errors)[0].properties.message;
        res.render('crypto/create', { error: err });
    }
});

module.exports = router;