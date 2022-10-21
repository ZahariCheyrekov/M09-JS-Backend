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
        await auctionService.create({
            ...req.body,
            author: req.user._id,
            publisherName: req.user.publisherName
        });
        res.redirect('/auction');

    } catch (error) {
        const err = Object.values(error.errors)[0].properties.message;
        res.render('auction/create', { error: err });
    }
});

router.get('/:auctionId/details', async (req, res) => {
    const auction = await auctionService.getAuction(req.params.auctionId);

    const isOwner = String(auction.author) == req.user?._id;
    const bidder = auction.bidder;
    const placedByUser = String(auction.bidder) === req.user?._id;

    res.render('auction/details', { ...auction.toObject(), isOwner, bidder, placedByUser });
});

router.get('/:auctionId/delete', async (req, res) => {
    await auctionService.deleteAuction(req.params.auctionId);

    res.redirect('/auction');
});

module.exports = router;