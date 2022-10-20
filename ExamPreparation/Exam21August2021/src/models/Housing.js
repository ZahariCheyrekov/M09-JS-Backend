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
    tenants: [
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

housingSchema.method('getTenants', function () {
    return this.tenants.map(tenant => tenant.name).join(', ');
});

exports.Housing = mongoose.model('Housing', housingSchema);