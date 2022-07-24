const express = require('express');
const hbs = require('express-handlebars');

const { PORT } = require('./config/env');

const app = express();

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));