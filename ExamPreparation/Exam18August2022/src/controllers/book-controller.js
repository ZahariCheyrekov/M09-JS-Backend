const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const books = await bookService.getAllBooks();

    res.render('book/catalog', { books });
});

router.get('/create', isAuth, (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await bookService.createBook({ ...req.body, owner: req.user._id });

        res.redirect('/books');
    } catch (error) {
        res.render('book/create', { error: error.message });
    }
});

router.get('/:bookId/details', async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);

    const isOwner = String(book.owner) === req.user?._id;

    const isWished = book.wishingList.some(userId => String(userId._id) === req.user?._id);

    res.render('book/details', { ...book.toObject(), isOwner, isWished });
});

router.get('/:bookId/wish', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user?._id;

    await bookService.wishBook(bookId, userId);

    res.redirect(`/books/${bookId}/details`);
});

router.get('/:bookId/edit', isAuth, async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId);

    res.render('book/edit', { ...book.toObject() });
});

router.post('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const bookData = req.body;

    await bookService.editBook(bookId, bookData);

    res.redirect(`/books/${bookId}/details`);
});

router.get('/:bookId/delete', isAuth, async (req, res) => {
    await bookService.deleteBook(req.params.bookId);

    res.redirect('/books');
});

module.exports = router;