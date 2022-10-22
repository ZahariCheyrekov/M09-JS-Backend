const mongoose = require('mongoose');

const tripSchema = mongoose.Schema({
    startPoint: {
        type: String,
        min: [4, 'Start point should be at least 4 characters long!'],
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    carImage: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    carBrand: {
        type: String,
        min: [4, 'Car brand should be at least 4 characters long!'],
        required: true
    },
    seats: {
        type: Number,
        min: 0,
        max: 4,
        required: true
    },
    price: {
        type: Number,
        min: 1,
        max: 50,
        required: true
    },
    description: {
        type: String,
        min: [10, 'Description should be at least 10 characters long!'],
        required: true
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    buddies: [
        {
            type: String,
            ref: 'User',
            default: ''
        }
    ]
});

module.exports = mongoose.model('Trip', tripSchema);