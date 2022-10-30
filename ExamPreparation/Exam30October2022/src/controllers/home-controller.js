const router = require('express').Router();

const blogService = require('../services/blog-service');

router.get('/', async (req, res) => {
    const blogs = await blogService.getTopBlogs();

    res.render('home', { blogs });
});

module.exports = router;