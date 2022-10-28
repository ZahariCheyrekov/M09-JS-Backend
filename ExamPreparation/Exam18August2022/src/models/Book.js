const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: {
        type: String,
        min: [2, 'Username should be at least 2 characters long'],
        required: true
    },
    author: {
        type: String,
        min: [5, 'Username should be at least 5 characters long'],
        required: true
    },
    image: {
        type: String,
        validate: [/^https?:\/\//i, 'Image url should start with \'http: or https:\' '],
        required: true
    },
    bookReview: {
        type: String,
        min: [10, 'Username should be at least 10 characters long'],
        required: true
    },
    genre: {
        type: String,
        min: [3, 'Username should be at least 3 characters long'],
        required: true
    },
    stars: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    wishingList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Book', bookSchema);