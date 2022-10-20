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

router.get('/:bookId/details', async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);

    const isOwner = String(book.owner) === req.user?._id;

    const isWished = book.wishingList.some(userId => String(userId._id) === req.user?._id);

    res.render('book/details', { ...book.toObject(), isOwner, isWished });
});

router.get('/:bookId/wish', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user?._id;

    await bookService.wishBook(bookId, userId);

    res.redirect(`/books/${bookId}/details`);
});

router.get('/:bookId/edit', async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);

    res.render('book/edit', { ...book.toObject() });
});

router.post('/:bookId/edit', async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;

    await bookService.editBook(bookId, bookData);

    res.redirect(`/books/${bookId}/details`);
});

router.get('/:bookId/delete', async (req, res) => {
    await bookService.deleteBook(req.params.bookId);

    res.redirect('/books');
});

module.exports = router;