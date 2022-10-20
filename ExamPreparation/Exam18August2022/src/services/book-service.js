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
        return await Book.create(bookData);
    } catch (error) {
        console.log(error);
    }
}

exports.getWishBooks = async (userId) => {
    try {
        return await Book.find({ wishingList: { $in: userId } }).lean();
    } catch (error) {
        console.log(error);
    }
}

exports.wishBook = async (bookId, userId) => {
    try {
        return await Book.findOneAndUpdate(
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
        return await Book.findByIdAndDelete(bookId);
    } catch (error) {
        console.log(error);
    }
}

exports.editBook = async (bookId, bookData) => {
    try {
        return await Book.findByIdAndUpdate(bookId, bookData);
    } catch (error) {
        console.log(error);
    }
}