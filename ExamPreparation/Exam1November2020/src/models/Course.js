const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
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
    duration: {
        type: String,
        required: true
    },
    usersEnrolled: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
},
    { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);