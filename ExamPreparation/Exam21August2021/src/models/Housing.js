const mongoose = require('mongoose');

const housingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    availablePieces: {
        type: Number,
        required: true
    },
    tenats: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

exports.method('getTenats', () => {
    return this.tenats.map(tenant => tenant.name).join(', ');
});

const Housing = mongoose.model('User', housingSchema);
module.exports = Housing;