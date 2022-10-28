const router = require('express').Router();

const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const books = await bookService.getAll();

    res.render('book', { books });
});

router.get('/create', (req, res) => {
    res.render('book/create');
});

router.post('/create', async (req, res) => {
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

router.get('/:bookId/wish', async (req, res) => {
    const bookId = req.params.bookId;
    const userId = req.user._id;

    await bookService.wishBook(bookId, userId);

    res.redirect(`/books/${bookId}/details`);
});

router.get('/:bookId/edit', async (req, res) => {
    const bookId = req.params.bookId;
    const book = await bookService.getOne(bookId);

    res.render('book/edit', { ...book.toObject() });
});

router.get('/:bookId/delete', async (req, res) => {
    await bookService.deleteBook(req.params.bookId);

    res.redirect('/books');
});

module.exports = router;