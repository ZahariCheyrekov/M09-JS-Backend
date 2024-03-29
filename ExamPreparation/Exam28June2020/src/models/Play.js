const mongoose = require('mongoose');

const playSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        max: 50,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersLiked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model('Play', playSchema);