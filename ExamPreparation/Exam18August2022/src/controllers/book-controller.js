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
    
    res.render('book/details', { ...book.toObject() });
});

module.exports = router;