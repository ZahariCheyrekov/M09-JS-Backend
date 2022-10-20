const router = require('express').Router();

const housingService = require('../services/housing-service');

router.get('/', async (req, res) => {
    const housings = await housingService.getTopHousings();

    res.render('home', { title: 'Home Page', housings });
});

router.get('/search', async (req, res) => {
    const query = req.query.text;

    const housings = await housingService.search(query);
    res.render('housing/search', { housings });
});

module.exports = router;