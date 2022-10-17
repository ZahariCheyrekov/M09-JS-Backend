const express = require('express');

const expressConfig = require('./config/express.js');
const routesConfig = require('./config/routes.js');
const { configDatabase } = require('./config/database.js');

const app = express();
expressConfig(app);
routesConfig(app);

app.get('/', (req, res) => res.send('It works!'));

configDatabase(app);