const Hotel = require('../models/Hotel');
const User = require('../models/User');

exports.getOne = async (hotelId) => {
    return await Hotel.findById(hotelId);
}

exports.getTopHotels = async () => {
    return await Hotel.find().sort({ freeRooms: -1, createdAt: -1 }).limit(3).lean();
}

exports.getUserReservations = async (userId) => {
    const reservations = [];

    const hotels = await Hotel.find({ usersBooked: { $in: userId } });

    for (const { name } of hotels) {
        reservations.push({ 'name': name });
    }

    return reservations;
}

exports.create = async (userId, hotelData) => {
    const hotel = await Hotel.create(hotelData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { offeredHotels: hotel._id } },
        { runValidators: true }
    )
}

exports.bookHotel = async (userId, hotelId) => {
    await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { bookedHotels: hotelId } },
        { runValidators: true }
    );

    return await Hotel.findByIdAndUpdate(
        { _id: hotelId },
        {
            $push: { usersBooked: userId },
            $inc: { freeRooms: -1 }
        },
        { runValidators: true }
    );
}

exports.editHotel = async (hotelId, hotelData) => {
    return await Hotel.findByIdAndUpdate(hotelId, hotelData);
}

exports.deleteHotel = async (hotelId) => {
    return await Hotel.findByIdAndDelete(hotelId);
}