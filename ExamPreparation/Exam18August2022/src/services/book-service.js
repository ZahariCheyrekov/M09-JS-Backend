const Book = require('../models/Book');

exports.getAll = async () => {
    return await Book.find().lean();
}