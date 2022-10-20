const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const bookController = require('./controllers/book-controller');
const profileController = require('./controllers/profile-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/books', bookController);
router.use('/profile', profileController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;