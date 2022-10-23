const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const hotelController = require('./controllers/hotel-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/hotels', hotelController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;