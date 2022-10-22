const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        min: [6, 'Title should be at least 6 characters long'],
        requried: true
    },
    keyword: {
        type: String,
        min: [6, 'Keyword should be at least 6 characters long'],
        requried: true
    },
    location: {
        type: String,
        min: [15, 'Location name should be maximum 15 characters long'],
        requried: true
    },
    date: {
        type: String,
        requried: true
    },
    image: {
        type: String,
        validate: /^https:?\/\//i,
        required: true
    },
    description: {
        type: String,
        min: [8, 'Description should be at least 8 characters long'],
        requried: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    votes: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    rating: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Post', postSchema);