const router = require('express').Router();

const homeController = require('./controllers/home-controller');
const authController = require('./controllers/auth-controller');
const courseController = require('./controllers/course-controller');

router.use('/', homeController);
router.use('/auth', authController);
router.use('/courses', courseController);
router.use('*', (req, res) => res.render('404'));

module.exports = router;