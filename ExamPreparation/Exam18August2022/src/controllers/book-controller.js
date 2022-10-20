const router = require('express').Router();

const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();

    res.render('book/catalog', { books });
});

router.get('/create', (req, res) => {
    res.render('book/create');
});

router.post('/create', async (req, res) => {
    await bookService.createBook({ ...req.body, owner: req.user._id });

    res.redirect('/books');
});

module.exports = router;