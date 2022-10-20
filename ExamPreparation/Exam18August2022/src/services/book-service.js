const Book = require('../models/Book');

exports.getBookById = async (bookId) => {
    try {
        return await Book.findById(bookId);
    } catch (error) {
        console.log(error);
    }
}

exports.getAllBooks = async () => {
    try {
        return await Book.find().lean();
    } catch (error) {
        console.log(error);
    }
}

exports.createBook = async (bookData) => {
    try {
        await Book.create(bookData);
    } catch (error) {
        console.log(error);
    }
}

exports.wishBook = async (bookId, userId) => {
    try {
        await Book.findOneAndUpdate(
            { _id: bookId },
            {
                $push: { wishingList: userId },
            },
            { runValidators: true }
        );
    } catch (error) {
        console.log(error);
    }
}

exports.deleteBook = async (bookId) => {
    try {
        await Book.findByIdAndDelete(bookId);
    } catch (error) {
        console.log(error);
    }
}

exports.editBook = async (bookId, bookData) => {
    try {
        await Book.findByIdAndUpdate(bookId, bookData);
    } catch (error) {
        console.log(error);
    }
}