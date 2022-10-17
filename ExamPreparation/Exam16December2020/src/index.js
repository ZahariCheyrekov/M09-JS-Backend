const express = require('express');

const expressConfig = require('./config/express.js');

const { configDatabase } = require('./config/database.js');

const app = express();
expressConfig(app);

app.get('/', (req, res) => res.send('It works!'));

configDatabase(app);