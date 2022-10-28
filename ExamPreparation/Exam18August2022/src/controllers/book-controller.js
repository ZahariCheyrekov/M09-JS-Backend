const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const books = await bookService.getAll();

    res.render('book', { books });
});

router.get('/create', isAuth, (req, res) => {
    res.render('book/create');
});

router.post('/create', isAuth, async (req, res) => {
    try {
        await bookService.createBook({ ...req.body, owner: req.user._id });
        res.redirect('/books');

    } catch (error) {
        console.log(error);
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('theater/create', { errors });
    }
});

router.get('/:bookId/details', async (req, res) => {
    const book = await bookService.getOne(req.params.bookId);

    const isOwner = String(book.owner) === req.user?._id;
    const isWished = book.wishingList.some(user => String(user) === req.user?._id);

    res.render('book/details', { ...book.toObject(), isOwner, isWished });
});

router.get('/:bookId/wish', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    await bookService.wishBook(bookId, userId);

    res.redirect(`/books/${bookId}/details`);
});

router.get('/:bookId/edit', isAuth, async (req, res) => {
    const bookId = req.params.bookId;
    const book = await bookService.getOne(bookId);

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