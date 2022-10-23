const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const authService = require('../services/auth-service');
const theaterService = require('../services/theater-service');

router.get('/create', isAuth, (req, res) => {
    res.render('theater/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        const isTheaterPublic = req.body.isPublic === 'on' ? true : false;
        req.body.isPublic = isTheaterPublic;

        await theaterService.createTheater({ ...req.body, author: req.user._id });
        res.redirect('/');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('theater/create', { errors });
    }
});

router.get('/:theaterId/details', async (req, res) => {
    const theater = await theaterService.getOne(req.params.theaterId);
    const { username: author } = await authService.getUser(theater.author);

    const isOwner = String(theater.author) === req.user?._id;
    const isLiked = theater.usersLiked.some(user => String(user) === req.user?._id);

    res.render('theater/details', { ...theater.toObject(), author, isOwner, isLiked });
});

router.get('/:theaterId/edit', isAuth, async (req, res) => {
    const theater = await theaterService.getOne(req.params.theaterId);

    res.render('theater/edit', { ...theater.toObject() });
});

router.get('/:theaterId/like', isAuth, async (req, res) => {
    const theaterId = req.params.theaterId;

    await theaterService.likeTheater(req.user._id, theaterId);

    res.redirect(`/theaters/${theaterId}/details`);
});

router.post('/:theaterId/edit', isAuth, async (req, res) => {
    const theaterId = req.params.theaterId;

    const isTheaterPublic = req.body.isPublic === 'on' ? true : false;
    req.body.isPublic = isTheaterPublic;

    await theaterService.editTheater(theaterId, req.body);

    res.redirect(`/theaters/${theaterId}/details`);
});

router.get('/:theaterId/delete', isAuth, async (req, res) => {
    await theaterService.deleteTheater(req.params.theaterId);

    res.redirect('/');
});

module.exports = router;