const Book = require('../models/Book');

exports.getAll = async () => {
    return await Book.find().lean();
}

exports.createBook = async (bookData) => {
    return await Book.create(bookData);
}