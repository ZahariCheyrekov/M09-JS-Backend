const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
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