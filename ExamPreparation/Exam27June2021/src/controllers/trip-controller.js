const router = require('express').Router();

const tripService = require('../services/trip-service');
const userService = require('../services/auth-service');
const { isAuth } = require('../middlewares/auth-middleware');

router.get('/', async (req, res) => {
    const trips = await tripService.getTrips();

    res.render('trip', { trips });
});

router.get('/offer', isAuth, async (req, res) => {
    res.render('trip/offer');
});

router.post('/offer', isAuth, async (req, res) => {
    try {
        await tripService.createTrip(req.user._id, { ...req.body, creator: req.user._id });
        res.redirect('/trip');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('trip/offer', { errors });
    }
});

router.get('/:tripId/details', async (req, res) => {
    const trip = await tripService.getTrip(req.params.tripId);
    const { email: creatorEmail } = await userService.getUser(trip.creator);

    const isOwner = String(trip.creator) === req.user?._id;
    const availableSeats = trip.seats > 0;
    const joinedBuddies = trip.buddies.length > 0;
    const buddies = trip.buddies.join(', ');
    const joined = !isOwner && trip.buddies.some(buddy => buddy === req.user?.email);

    res.render('trip/details', {
        ...trip.toObject(),
        creatorEmail,
        isOwner,
        availableSeats,
        joinedBuddies,
        buddies,
        joined
    });
});

router.get('/:tripId/join', isAuth, async (req, res) => {
    const tripId = req.params.tripId;
    await tripService.joinTrip(req.user.email, tripId);

    res.redirect(`/trip/${tripId}/details`);
});

router.get('/:tripId/edit', isAuth, async (req, res) => {
    const trip = await tripService.getTrip(req.params.tripId);

    res.render('trip/edit', { ...trip.toObject() });
})

router.post('/:tripId/edit', isAuth, async (req, res) => {
    const tripId = req.params.tripId;
    const tripData = req.body;

    await tripService.editTrip(tripId, tripData);

    res.redirect(`/trip/${tripId}/details`);
});

router.get('/profile', isAuth, async (req, res) => {
    const trips = await tripService.getUserTrips(req.user?._id);
    const isMale = req.user?.gender;

    res.render('trip/profile', { trips, isMale });
});

router.get('/:tripId/delete', isAuth, async (req, res) => {
    await tripService.deleteTrip(req.params.tripId);

    res.redirect('/trip');
});

module.exports = router;