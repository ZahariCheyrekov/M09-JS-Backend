const Book = require('../models/Book');

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