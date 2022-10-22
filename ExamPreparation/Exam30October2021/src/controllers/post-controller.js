const router = require('express').Router();

const postService = require('../services/post-service');
const authService = require('../services/auth-service');

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

router.get('/:postId/details', async (req, res) => {
    const post = await postService.getOne(req.params.postId);
    const { firstName, lastName } = await authService.getUser(post.author);

    const author = `${firstName} ${lastName}`;
    const isOwner = String(post.author) === req.user?._id;
    const isVoted = post.votes.some(vote => String(vote) === req.user?._id);
    const peopleEmails = await postService.getPeopleEmails(req.params.postId);
    const emailsAvailable = peopleEmails.length > 0;

    res.render('posts/details', {
        ...post.toObject(),
        author,
        isOwner,
        isVoted,
        emailsAvailable,
        peopleEmails
    });
});

router.get('/:postId/upvote', async (req, res) => {
    const postId = req.params.postId;
    await postService.upvote(postId, req.user._id);

    res.redirect(`/posts${postId}/details`);
});

router.get('/:postId/downvote', async (req, res) => {
    const postId = req.params.postId;
    await postService.downvote(postId, req.user._id);

    res.redirect(`/posts${postId}/details`);
});

router.get('/:postId/edit', async (req, res) => {
    const post = await postService.getOne(req.params.postId);

    res.render('posts/edit', { ...post.toObject() });
});

router.post('/:postId/edit', async (req, res) => {
    const postId = req.params.postId;
    await postService.editPost(postId, req.body);

    res.redirect(`/posts/${postId}/details`);
});

router.get('/:postId/delete', async (req, res) => {
    await postService.deletePost(req.params.postId);

    res.redirect('/posts');
});

module.exports = router;