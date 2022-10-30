const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        minLength: [5, 'Title should be minimum 5 characters long'],
        maxLength: [50, 'Title should be maximum 50 characters long'],
        required: [true, 'Title is required']
    },
    image: {
        type: String,
        validate: [/^https?:\/\//i, 'Image url should start with \'http://\' or \'https://\'.'],
        required: [true, 'Image url is required']
    },
    content: {
        type: String,
        minLength: [10, 'Content should be minimum 10 characters long'],
        required: [true, 'Content is required']
    },
    category: {
        type: String,
        minLength: [3, 'Category should be minimum 3 characters long'],
        required: [true, 'Cateory is required']
    },
    followList: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);