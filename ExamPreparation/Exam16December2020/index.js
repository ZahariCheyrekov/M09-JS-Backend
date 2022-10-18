const express = require('express');

const { PORT } = require('./config');
const { configDatabase } = require('./config/database-config');


const app = express();


configDatabase(app, PORT);