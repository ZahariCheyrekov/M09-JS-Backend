const router = require('express').Router();

const hotelService = require('../services/hotel-service');

router.get('/create', async (req, res) => {
    res.render('hotels/create');
});

router.post('/create', async (req, res) => {
    try {
        await hotelService.create(req.user._id, { ...req.body, owner: req.user.username });
        res.redirect('/');

    } catch (error) {
        console.log(error);
    }
});

router.get('/:hotelId/details', async (req, res) => {
    const hotel = await hotelService.getOne(req.params.hotelId);

    const isOwner = hotel.owner === req.user?.username;
    const isBooked = hotel.usersBooked.some(user => String(user) === req.user?._id);

    res.render('hotels/details', { ...hotel.toObject(), isOwner, isBooked });
});

module.exports = router;