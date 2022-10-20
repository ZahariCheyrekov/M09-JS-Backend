const router = require('express').Router();

const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const { _id, email } = req.user;
    const books = await bookService.getWishBooks(_id);

    res.render('profile', { email, books })
});

module.exports = router;