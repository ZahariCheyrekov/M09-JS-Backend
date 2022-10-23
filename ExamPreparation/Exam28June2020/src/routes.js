const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const theaterController = require('./controllers/theater-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/theaters', theaterController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;