const mongoose = require('mongoose');

const { DB_QUERYSTRING } = require('./env');

mongoose.connect(DB_QUERYSTRING);

mongoose.connection.on('open', () => console.log('Db is connected!'));