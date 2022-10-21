const router = require('express').Router();

const adsService = require('../services/ads-service');

router.get('/', async (req, res) => {
    const ads = await adsService.getTopAds();

    res.render('home', { ads });
});

module.exports = router;