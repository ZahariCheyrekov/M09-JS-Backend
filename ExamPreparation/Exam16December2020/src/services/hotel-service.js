const Hotel = require('../models/Hotel');
const User = require('../models/User');

exports.getOne = async (hotelId) => {
    return await Hotel.findById(hotelId);
}

exports.getTopHotels = async () => {
    return await Hotel.find().sort({ freeRooms: -1, createdAt: -1 }).limit(3).lean();
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
        { $push: { usersBooked: userId } },
        { runValidators: true }
    );
}

exports.deleteHotel = async (hotelId) => {
    return await Hotel.findByIdAndDelete(hotelId);
}