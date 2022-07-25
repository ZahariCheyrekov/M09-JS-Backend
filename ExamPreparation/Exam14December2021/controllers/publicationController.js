const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');

router.use(isAuth);

router.get('/create', (req, res) => {
    res.render('publication/create')
});

module.exports = router;