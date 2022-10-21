const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const auctionController = require('./controllers/auction-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/auction', auctionController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;