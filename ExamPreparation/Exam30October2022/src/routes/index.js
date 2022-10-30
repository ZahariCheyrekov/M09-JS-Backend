const router = require('express').Router();

const homeController = require('../controllers/home-controller');
const authController = require('../controllers/auth-controller');
const blogController = require('../controllers/blog-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/blog', blogController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;