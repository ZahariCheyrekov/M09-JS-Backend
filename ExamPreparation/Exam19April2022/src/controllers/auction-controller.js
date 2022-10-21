const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const auctionService = require('../services/auction-service');

router.get('/', async (req, res) => {
    const auctions = await auctionService.getAll();

    res.render('auction', { auctions });
});

router.get('/create', isAuth, (req, res) => {
    res.render('auction/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await auctionService.create({
            ...req.body,
            author: req.user?._id,
            publisherName: req.user.publisherName
        });
        res.redirect('/auction');

    } catch (error) {
        console.log(error)
        const err = Object.values(error.errors)[0].properties?.message;
        res.render('auction/create', { error: err });
    }
});

router.get('/:auctionId/details', async (req, res) => {
    const auction = await auctionService.getAuction(req.params.auctionId);

    const isOwner = String(auction.author) == req.user?._id;
    const bidder = auction.bidder;
    const placedByUser = String(auction.bidder) === req.user?._id;
    console.log(req.user.publisherName)
    res.render('auction/details', { ...auction.toObject(), isOwner, bidder, placedByUser });
});

router.get('/:auctionId/edit', isAuth, async (req, res) => {
    const auction = await auctionService.getAuction(req.params.auctionId);

    const hasBidder = auctionService.bidder;

    res.render('auction/edit', { ...auction.toObject(), hasBidder });
});

router.post('/:auctionId/edit', isAuth, async (req, res) => {
    const auctionId = req.params.auctionId;
    const auctionData = req.body;

    await auctionService.editAuction(auctionId, auctionData);

    res.redirect(`/auction/${auctionId}/details`);
});

router.get('/:auctionId/delete', isAuth, async (req, res) => {
    await auctionService.deleteAuction(req.params.auctionId);

    res.redirect('/auction');
});

module.exports = router;