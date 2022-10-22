const router = require('express').Router();

const galleryService = require('../services/gallery-service');

router.get('/', async (req, res) => {
    const publications = await galleryService.getAll();

    res.render('home', { publications });
});

module.exports = router;