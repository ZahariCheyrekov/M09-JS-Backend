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
    await cryptoService.create({ ...req.body, owner: req.user._id });

    res.redirect('/crypto');
});

router.get('/:coinId/details', async (req, res) => {
    const coin = await cryptoService.getCoin(req.params.coinId);
    const userId = req.user?._id;

    const isOwner = String(coin.owner) === userId;
    const boughtCrypto = coin.buyCrypto.some(buyer => String(buyer._id) === userId);

    res.render('crypto/details', { ...coin.toObject(), isOwner, boughtCrypto });
});

router.get('/:coinId/buy', async (req, res) => {
    const coinId = req.params.coinId;
    const userId = req.user._id;

    await cryptoService.buyCoin(coinId, userId);

    res.redirect(`/crypto/${coinId}/details`);
});

router.get('/:coinId/delete', async (req, res) => {
    cryptoService.deleteCoin(req.params.coinId);
    
    res.redirect('/crypto');
});

module.exports = router;