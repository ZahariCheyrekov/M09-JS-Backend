const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/', async (req, res) => {
    const housings = await housingService.getTopHousings();

    res.render('home', { title: 'Home Page', housings });
});

module.exports = router;