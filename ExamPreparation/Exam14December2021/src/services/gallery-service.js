const Publication = require('../models/Publication');

exports.getAll = async () => {
    return await Publication.find().lean();
}