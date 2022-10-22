const router = require('express').Router();

const authService = require('../services/auth-service');
const galleryService = require('../services/gallery-service');

router.get('/', async (req, res) => {
    const publications = await galleryService.getAll();

    res.render('gallery', { publications });
});

router.get('/create', async (req, res) => {
    res.render('gallery/create');
});

router.post('/create', async (req, res) => {
    try {
        await galleryService.createPublication(req.user._id, { ...req.body, author: req.user._id })
        res.redirect('/gallery');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('gallery/create', { errors });
    }
});

router.get('/:publicationId/details', async (req, res) => {
    const publication = await galleryService.getOne(req.params.publicationId);
    const { username: authorName } = await authService.getUser(req.user?._id);

    const isOwner = String(publication.author) === req.user?._id;

    res.render('gallery/details', { ...publication.toObject(), authorName, isOwner });
});

module.exports = router;