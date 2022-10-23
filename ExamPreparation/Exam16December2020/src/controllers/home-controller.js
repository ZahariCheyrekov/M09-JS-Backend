const router = require('express').Router();

const hotelService = require('../services/hotel-service');

router.get('/', async (req, res) => {
    const hotels = await hotelService.getTopHotels();

    res.render('home', { hotels });
});

module.exports = router;