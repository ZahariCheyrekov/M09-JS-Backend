const express = require('express');

const configDatabase = require('./config/config-database');
const { PORT } = require('./constants');

const app = express();

require('./config/hbs-config')(app);
require('./config/express-config')(app);

app.get('/', (req, res) => {
    res.send('Application is running correctly!');
});

configDatabase(app, PORT);