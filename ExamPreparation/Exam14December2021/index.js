const express = require('express');

const { PORT } = require('./config/env');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));


app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));