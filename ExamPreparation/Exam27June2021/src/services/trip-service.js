const Trip = require('../models/Trip');
const User = require('../models/User');

exports.getTrip = async (tripId) => {
    return await Trip.findById(tripId);
}

exports.getTrips = async () => {
    return await Trip.find().lean();
}

exports.getUserTrips = async (userId) => {
    return await Trip.find({ creator: userId }).lean();
}

exports.createTrip = async (userId, tripData) => {
    const trip = await Trip.create(tripData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { tripsHistory: trip._id } },
        { runValidators: true }
    );
}

exports.joinTrip = async (userEmail, tripId) => {
    return await Trip.findByIdAndUpdate(
        { _id: tripId },
        {
            $push: { buddies: userEmail },
            $inc: { seats: -1 }
        },
        { runValidators: true }
    )
}

exports.editTrip = async (tripId, tripData) => {
    return await Trip.findByIdAndUpdate(tripId, tripData);
}

exports.deleteTrip = async (tripId) => {
    return await Trip.findByIdAndDelete(tripId);
}