const Book = require('../models/Book');

exports.getOne = async (bookId) => {
    return await Book.findById(bookId);
}

exports.getAll = async () => {
    return await Book.find().lean();
}

exports.createBook = async (bookData) => {
    return await Book.create(bookData);
}

exports.deleteBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId);
}