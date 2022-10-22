const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    title: {
        type: String,
        min: [6, 'Username should be at least 6 characters long'],
        required: true
    },
    paintingTechnique: {
        type: String,
        max: [15, 'Username should be maximum 15 characters long'],
        required: true
    },
    artPicture: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    certificateOfAuthenticity: {
        type: String,
        enum: ['Yes', 'No'],
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersShared: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model('Publication', publicationSchema);