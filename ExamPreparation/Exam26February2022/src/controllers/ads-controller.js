const router = require('express').Router();

const adsService = require('../services/ads-service');

router.get('/', async (req, res) => {
    const ads = await adsService.getAll();

    res.render('ads', { ads });
});

router.get('/create', (req, res) => {
    res.render('ads/create');
});

router.post('/create', async (req, res) => {
    try {
        await adsService.create(req.body);
        res.redirect('/ads');

    } catch (error) {
        const err = Object.values(error.errors)[0].properties.message;
        res.render('crypto/create', { error: err });
    }
});

module.exports = router;