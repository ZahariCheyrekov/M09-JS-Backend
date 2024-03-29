const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const authService = require('../services/auth-service');
const galleryService = require('../services/gallery-service');

router.get('/', async (req, res) => {
    const publications = await galleryService.getAll();

    res.render('gallery', { publications });
});

router.get('/create', isAuth, async (req, res) => {
    res.render('gallery/create');
});

router.post('/create', isAuth, async (req, res) => {
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
    const isShared = publication.usersShared.some(user => String(user) === req.user?._id);

    res.render('gallery/details', { ...publication.toObject(), authorName, isOwner, isShared });
});

router.get('/:publicationId/share', isAuth, async (req, res) => {
    await galleryService.sharePublication(req.params.publicationId, req.user._id);

    res.redirect('/');
});

router.get('/:publicationId/edit', isAuth, async (req, res) => {
    const publication = await galleryService.getOne(req.params.publicationId);

    res.render('gallery/edit', { ...publication.toObject() });
});

router.post('/:publicationId/edit', isAuth, async (req, res) => {
    const publicationId = req.params.publicationId;
    const publicationData = req.body;

    await galleryService.editPublication(publicationId, publicationData);

    res.redirect(`/gallery/${publicationId}/details`);
});

router.get('/profile', isAuth, async (req, res) => {
    const user = await authService.getUser(req.user._id);

    const publications = await authService.getUserPublications(req.user._id);
    const userPublications = await authService.getUserPublications(req.user._id);

    res.render('gallery/profile', { ...user.toObject(), publications, userPublications });
});

router.get('/:publicationId/delete', isAuth, async (req, res) => {
    await galleryService.deletePublication(req.params.publicationId);

    res.redirect('/gallery');
});

module.exports = router;