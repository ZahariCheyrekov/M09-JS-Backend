const router = require('express').Router();

const auctionService = require('../services/auction-service');

router.get('/', async (req, res) => {
    const auctions = await auctionService.getAll();

    res.render('auction', { auctions });
});

router.get('/create', (req, res) => {
    res.render('auction/create');
});

router.post('/create', async (req, res) => {
    try {
        await auctionService.create({ ...req.body, author: req.user._id });
        res.redirect('/auction');

    } catch (error) {
        const err = Object.values(error.errors)[0].properties.message;
        res.render('auction/create', { error: err });
    }
});

module.exports = router;