const router = require('express').Router();

const postService = require('../services/post-service');

router.get('/', async (req, res) => {
    const posts = await postService.getAll();
    
    res.render('posts', { posts });
});

module.exports = router;