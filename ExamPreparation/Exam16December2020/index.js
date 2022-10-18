const express = require('express');

const { PORT } = require('./config');
const configExpress = require('./config/express-config');
const { configDatabase } = require('./config/database-config');
const routes = require('./config/routes');

const app = express();
configExpress(app);

app.get('/', (req, res) => {
    res.send('Application is running correctly!');
});

app.use(routes);
configDatabase(app, PORT);
