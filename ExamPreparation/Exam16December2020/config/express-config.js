const hbs = require('express-handlebars');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('views', path.resolve(__dirname, '../views'));
    app.set('view engine', 'hbs');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
}