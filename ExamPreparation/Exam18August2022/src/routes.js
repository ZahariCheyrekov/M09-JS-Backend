const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const bookController = require('./controllers/book-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/books', bookController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;