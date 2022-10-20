const mongoose = require('mongoose');

const housingSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 6,
        required: true
    },
    type: {
        type: String,
        enum: ['Apartment', 'Villa', 'House'],
        required: true
    },
    year: {
        type: Number,
        min: 1850,
        max: new Date().getFullYear(),
        required: true
    },
    city: {
        type: String,
        minLength: 6,
        required: true
    },
    image: {
        type: String,
        validate: /^https?:\/\//i,
        required: true
    },
    description: {
        type: String,
        maxLength: 60,
        required: true
    },
    availablePieces: {
        type: Number,
        min: 0,
        max: 10,
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