const express = require('express');

const { PORT } = require('./config');
const { configDatabase } = require('./config/database-config');


const app = express();

app.get('/', (req, res) => {
    res.send('Application is running correctly!');
});

configDatabase(app, PORT);