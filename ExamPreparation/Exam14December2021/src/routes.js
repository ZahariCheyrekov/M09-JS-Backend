const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const galleryController = require('./controllers/gallery-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/gallery', galleryController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;