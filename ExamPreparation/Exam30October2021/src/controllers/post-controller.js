const router = require('express').Router();

const postService = require('../services/post-service');
const authService = require('../services/auth-service');
const { isAuth } = require('../middlewares/auth-middleware');

router.get('/', async (req, res) => {
    const posts = await postService.getAll();

    res.render('posts', { posts });
});

router.get('/create', isAuth, async (req, res) => {
    res.render('posts/create');
});

router.post('/create', isAuth, async (req, res) => {
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

router.get('/:postId/upvote', isAuth, async (req, res) => {
    const postId = req.params.postId;
    await postService.upvote(postId, req.user._id);

    res.redirect(`/posts${postId}/details`);
});

router.get('/:postId/downvote', isAuth, async (req, res) => {
    const postId = req.params.postId;
    await postService.downvote(postId, req.user._id);

    res.redirect(`/posts${postId}/details`);
});

router.get('/:postId/edit', isAuth, async (req, res) => {
    const post = await postService.getOne(req.params.postId);

    res.render('posts/edit', { ...post.toObject() });
});

router.post('/:postId/edit', isAuth, async (req, res) => {
    const postId = req.params.postId;
    await postService.editPost(postId, req.body);

    res.redirect(`/posts/${postId}/details`);
});

router.get('/my-posts', isAuth, async (req, res) => {
    const posts = await postService.getUserPosts(req.user._id);

    res.render('posts/my-posts', { posts });
});

router.get('/:postId/delete', isAuth, async (req, res) => {
    await postService.deletePost(req.params.postId);

    res.redirect('/posts');
});

module.exports = router;