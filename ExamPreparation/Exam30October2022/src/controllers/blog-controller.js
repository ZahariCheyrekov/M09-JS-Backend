const router = require('express').Router();

const { isAuth } = require('../guards/isAuth');
const { isAuthor } = require('../guards/isAuthor');
const { isBlogOwner } = require('../helpers/isBlogOwner');
const authService = require('../services/auth-service');
const blogService = require('../services/blog-service');
const { validateFields } = require('../validation/validate-fields');

router.get('/', async (req, res) => {
    const blogs = await blogService.getAll();

    res.render('blog', { blogs });
});

router.get('/create', isAuth, (req, res) => {
    res.render('blog/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await blogService.createBlog({ ...req.body, owner: req.user?._id });
        res.redirect('/blog');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('blog/create', { errors });
    }
});

router.get('/:blogId/delete', isAuth, isAuthor, async (req, res) => {
    const blog = await blogService.getOne(req.params.blogId);
    const isOwner = isBlogOwner(req.user?._id, String(blog.owner));

    if (isOwner) {
        await blogService.deleteBlog(req.params.blogId);

        res.redirect('/blog');
    } else {
        res.redirect('/');
    }
});

module.exports = router;