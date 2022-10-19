const express = require('express');

const app = express();
require('./config/hbs-config')(app);

app.get('/', (req, res) => {
    res.send('Application is running correctly!');
});

configDatabase(app, PORT);