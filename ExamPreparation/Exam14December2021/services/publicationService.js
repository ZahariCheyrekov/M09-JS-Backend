const Publication = require('../models/Publication');

exports.create = (publicationData) => Publication.createPublication(publicationData);