const router = require('express').Router();

const auctionService = require('../services/auction-service');

router.get('/', async (req, res) => {
    const auctions = await auctionService.getAll();

    res.render('auction', { auctions });
});

module.exports = router;