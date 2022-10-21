const router = require('express').Router();

const cryptoService = require('../services/crypto-service');

router.get('/', async (req, res) => {
    const coins = await cryptoService.getAllCoins();

    res.render('crypto', { coins });
});

router.get('/create', (req, res) => {
    res.render('crypto/create');
});

router.post('/create', async (req, res) => {
    await cryptoService.create(req.body);

    res.redirect('/crypto');
});

module.exports = router;