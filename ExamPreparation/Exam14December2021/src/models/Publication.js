const mongoose = require('mongoose');

const publicationSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    paintingTechnique: {
        type: String,
        required: true
    },
    artPicture: {
        type: String,
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