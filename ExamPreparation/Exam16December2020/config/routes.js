const router = require('express').Router();

const authController = require('../controllers/auth-controller');

router.use('/auth', authController);

module.exports = router;