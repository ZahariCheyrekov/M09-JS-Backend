const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const hotelService = require('../services/hotel-service');

router.get('/create', isAuth, async (req, res) => {
    res.render('hotels/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await hotelService.create(req.user._id, { ...req.body, owner: req.user.username });
        res.redirect('/');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('hotels/create', { errors });
    }
});

router.get('/:hotelId/details', async (req, res) => {
    const hotel = await hotelService.getOne(req.params.hotelId);

    const isOwner = hotel.owner === req.user?.username;
    const isBooked = hotel.usersBooked.some(user => String(user) === req.user?._id);

    res.render('hotels/details', { ...hotel.toObject(), isOwner, isBooked });
});

router.get('/:hotelId/book', isAuth, async (req, res) => {
    const hotelId = req.params.hotelId;

    await hotelService.bookHotel(req.user._id, hotelId);

    res.redirect(`/hotels/${hotelId}/details`);
});

router.get('/:hotelId/edit', isAuth, async (req, res) => {
    const hotel = await hotelService.getOne(req.params.hotelId);

    res.render('hotels/edit', { ...hotel.toObject() });
});

router.post('/:hotelId/edit', isAuth, async (req, res) => {
    const hotelId = req.params.hotelId;

    await hotelService.editHotel(hotelId, req.body);

    res.redirect(`/hotels/${hotelId}/details`);
});

router.get('/profile', isAuth, async (req, res) => {
    const reservations = await hotelService.getUserReservations(req.user._id);

    res.render('hotels/profile', { reservations });
});

router.get('/:bookId/delete', isAuth, async (req, res) => {
    await hotelService.deleteHotel(req.params.bookId);

    res.redirect('/');
});

module.exports = router;