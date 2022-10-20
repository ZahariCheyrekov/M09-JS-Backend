const router = require('express').Router();

const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();

    res.render('book/catalog', { books });
});

router.get('/create', (req, res) => {
    res.render('book/create');
});

module.exports = router;