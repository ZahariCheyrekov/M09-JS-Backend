const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        requried: true
    },
    keyword: {
        type: String,
        requried: true
    },
    location: {
        type: String,
        requried: true
    },
    date: {
        type: String,
        requried: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
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