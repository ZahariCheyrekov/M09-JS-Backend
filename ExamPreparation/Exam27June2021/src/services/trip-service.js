const Trip = require('../models/Trip');
const User = require('../models/User');

exports.getTrips = async () => {
    return await Trip.find().lean();
}

exports.createTrip = async (userId, tripData) => {
    const trip = await Trip.create(tripData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { tripsHistory: trip._id } },
        { runValidators: true }
    );
}