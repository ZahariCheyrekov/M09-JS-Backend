const router = require('express').Router();

const adsService = require('../services/ads-service');
const authService = require('../services/auth-service');

router.get('/', async (req, res) => {
    const ads = await adsService.getAll();

    res.render('ads', { ads });
});

router.get('/create', (req, res) => {
    res.render('ads/create');
});

router.post('/create', async (req, res) => {
    try {
        await adsService.create(req.user._id, { ...req.body, author: req.user._id });
        res.redirect('/ads');

    } catch (error) {
        const err = Object.values(error.errors)[0].properties.message;
        res.render('crypto/create', { error: err });
    }
});

router.get('/:adId/details', async (req, res) => {
    const ad = await adsService.getAd(req.params.adId);
    const { email } = await authService.getUser(ad.author);

    const isOwner = String(ad.author) === req.user?._id;

    res.render('ads/details', { ...ad.toObject(), isOwner, email });
});

module.exports = router;