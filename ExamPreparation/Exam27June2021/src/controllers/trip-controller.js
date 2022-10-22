const router = require('express').Router();

const tripService = require('../services/trip-service');

router.get('/', async (req, res) => {
    const trips = await tripService.getTrips();

    res.render('trip', { trips });
});

module.exports = router;