const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const cryptoService = require('../services/crypto-service');

router.get('/', async (req, res) => {
    const coins = await cryptoService.getAllCoins();

    res.render('crypto', { coins });
});

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await cryptoService.create({ ...req.body, owner: req.user._id });
        res.redirect('/crypto');
    } catch (error) {
        const err = Object.values(error.errors)[0].properties.message;
        res.render('crypto/create', { error: err });
    }
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

router.get('/:coinId/edit', async (req, res) => {
    const coin = await cryptoService.getCoin(req.params.coinId);

    res.render('crypto/edit', { ...coin.toObject() });
});

router.post('/:coinId/edit', async (req, res) => {
    const coinId = req.params.coinId;
    const coinData = req.body;

    await cryptoService.editCoin(coinId, coinData);

    res.redirect(`/crypto/${coinId}/details`);
});

router.get('/:coinId/delete', async (req, res) => {
    cryptoService.deleteCoin(req.params.coinId);

    res.redirect('/crypto');
});

router.get('/search', async (req, res) => {
    const coins = await cryptoService.getAllCoins();

    res.render('crypto/search', { coins });
});

router.post('/search', async (req, res) => {
    const coins = await cryptoService.getCoinsByWallet(req.body.paymentMethod);

    res.render('crypto/search', { coins });
});

module.exports = router;