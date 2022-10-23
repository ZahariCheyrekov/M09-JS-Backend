const router = require('express').Router();

const authService = require('../services/auth-service');
const theaterService = require('../services/theater-service');

router.get('/create', (req, res) => {
    res.render('theater/create');
});

router.post('/create', async (req, res) => {
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

module.exports = router;