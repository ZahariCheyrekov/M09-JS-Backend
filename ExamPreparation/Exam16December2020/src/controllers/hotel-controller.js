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

module.exports = router;