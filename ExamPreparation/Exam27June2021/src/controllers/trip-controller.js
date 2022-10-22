const router = require('express').Router();

const tripService = require('../services/trip-service');
const userService = require('../services/auth-service');

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

router.get('/:tripId/join', async (req, res) => {
    const tripId = req.params.tripId;
    await tripService.joinTrip(req.user.email, tripId);

    res.redirect(`/trip/${tripId}/details`);
});

router.get('/:tripId/delete', async (req, res) => {
    await tripService.deleteTrip(req.params.tripId);

    res.redirect('/trip');
});

module.exports = router;