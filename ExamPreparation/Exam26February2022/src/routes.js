const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const adsController = require('./controllers/ads-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/ads', adsController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;