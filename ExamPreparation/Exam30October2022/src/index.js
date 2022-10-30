const express = require('express');
const configDatabase = require('./config/config-database');
const routes = require('./routes');
const { PORT } = require('./constants');

const app = express();

require('./config/hbs-config')(app);
require('./config/express-config')(app);

app.use(routes);

configDatabase(app, PORT);