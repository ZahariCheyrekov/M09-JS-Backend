const router = require('express').Router();

const bookService = require('../services/book-service');

router.get('/', async (req, res) => {
    const books = await bookService.getAll();
    
    res.render('book', { books });
});

module.exports = router;