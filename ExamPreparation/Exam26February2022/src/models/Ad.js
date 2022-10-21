const mongoose = require('mongoose');

const adSchema = mongoose.Schema({
    headline: {
        type: String,
        min: [4, 'Headline should be minimum 4 characters long.'],
        required: true
    },
    location: {
        type: String,
        min: [8, 'Location should be minimum 8 characters long.'],
        required: true
    },
    companyName: {
        type: String,
        min: [3, 'Company name should be at least 4 characters long.'],
        required: true
    },
    companyDescription: {
        type: String,
        max: [30, 'Company description should be maximum 30 characters long.'],
        required: true
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    usersApplied: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Ad', adSchema);