const Hotel = require('../models/Hotel');

exports.getTopHotels = async () => {
    return await Hotel.find().sort({ freeRooms: 1 }).limit(3).lean();
}