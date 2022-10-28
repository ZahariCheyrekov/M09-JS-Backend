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

exports.wishBook = async (bookId, userId) => {
    return await Book.findByIdAndUpdate(
        { _id: bookId },
        { $push: { wishingList: userId } },
        { runValidators: true }
    );
}

exports.editBook = async (bookId, bookData) => {
    return await Book.findByIdAndUpdate(bookId, bookData);
}

exports.deleteBook = async (bookId) => {
    return await Book.findByIdAndDelete(bookId);
}