const router = require('express').Router();

const postService = require('../services/post-service');

router.get('/', async (req, res) => {
    const posts = await postService.getAll();

    res.render('posts', { posts });
});

router.get('/create', async (req, res) => {
    res.render('posts/create');
});

router.post('/create', async (req, res) => {
    try {
        await postService.createPost(req.user._id, { ...req.body, author: req.user._id });
        res.redirect('/posts');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('trip/offer', { errors });
    }
});


router.get('/:postId/delete', async (req, res) => {
    await postService.deletePost(req.params.postId);

    res.redirect('/post');
});
module.exports = router;