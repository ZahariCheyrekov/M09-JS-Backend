const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const cryptoService = require('../services/crypto-service');

router.get('/', async (req, res) => {
    const coins = await cryptoService.getAll();

    res.render('crypto', { coins });
});

router.get('/create', isAuth, (req, res) => {
    res.render('crypto/create');
});

router.post('/create', isAuth, async (req, res) => {
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

router.get('/:cryptoId/details', async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    const isOwner = String(crypto.owner) === req.user?._id;
    const isBought = crypto.buyCrypto.some(user => String(user) === req.user?._id);

    res.render('crypto/details', { ...crypto.toObject(), isOwner, isBought });
});

router.get('/:cryptoId/buy', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const userId = req.user._id;

    await cryptoService.buyCrypto(cryptoId, userId);

    res.redirect(`/crypto/${cryptoId}/details`);
});

router.get('/:cryptoId/edit', isAuth, async (req, res) => {
    const crypto = await cryptoService.getOne(req.params.cryptoId);

    res.render('crypto/edit', { ...crypto.toObject() });
});

router.post('/:cryptoId/edit', isAuth, async (req, res) => {
    const cryptoId = req.params.cryptoId;
    const cryptoData = req.body;

    await cryptoService.editCrypto(cryptoId, cryptoData);

    res.redirect(`/crypto/${cryptoId}/details`);
});

router.get('/search', async (req, res) => {
    const coins = await cryptoService.getAll();

    res.render('crypto/search', { coins });
});

router.get('/:cryptoId/delete', isAuth, async (req, res) => {
    await cryptoService.deleteCrypto(req.params.cryptoId);

    res.redirect('/crypto');
});

module.exports = router;