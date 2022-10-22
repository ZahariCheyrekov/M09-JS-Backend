const Trip = require('../models/Trip');

exports.getTrips = async () => {
    return await Trip.find().lean();
}