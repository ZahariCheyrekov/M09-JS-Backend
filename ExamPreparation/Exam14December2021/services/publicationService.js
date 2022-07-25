const Publication = require('../models/Publication');

exports.getAll = () => Publication.find();
exports.create = (publicationData) => Publication.createPublication(publicationData);