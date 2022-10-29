const router = require('express').Router();

const cryptoService = require('../services/crypto-service');

router.get('/', async (req, res) => {
    const coins = await cryptoService.getAll();

    res.render('crypto', { coins });
});

router.get('/create', (req, res) => {
    res.render('crypto/create');
});

router.post('/create', async (req, res) => {
    try {
        await cryptoService.createCrypto({ ...req.body, owner: req.user?._id });
        res.redirect('/crypto');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('crypto/create', { errors });
    }
});

module.exports = router;