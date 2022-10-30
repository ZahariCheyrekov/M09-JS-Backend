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


module.exports = router;