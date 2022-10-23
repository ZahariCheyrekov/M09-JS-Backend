const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        min: [4, 'Username should be at least 4 characters long'],
        required: true
    },
    description: {
        type: String,
        max: 50,
        min: [20, 'Username should be at least 20 characters long'],
        required: true
    },
    imageUrl: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Types.ObjectId,
        red: 'User'
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