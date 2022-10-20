const Book = require('../models/Book');

exports.getAllBooks = async () => {
    try {
        return await Book.find();
    } catch (error) {
        console.log(error);
    }
}