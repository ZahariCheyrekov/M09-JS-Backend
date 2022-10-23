const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        min: [4, 'The name should be at least 4 characters long.'],
        required: true
    },
    city: {
        type: String,
        min: [3, 'The name should be at least 3 characters long.'],
        required: true
    },
    imageUrl: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    freeRooms: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    usersBooked: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);