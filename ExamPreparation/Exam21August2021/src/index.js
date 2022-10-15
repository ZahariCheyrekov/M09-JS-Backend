const express = require('express');

const { configDatabase } = require('./config/databaseConfig.js');
const { PORT } = require('./constants');

const app = express();

const routes = require('./routes.js');

require('./config/expressConfig.js')(app);
require('./config/hbsConfig.js')(app);

app.use(routes);

configDatabase(app, PORT);