const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const expressConfig = (app) => {
    app.use('/static', express.static(path.resolve(__dirname, '../public')));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
}

module.exports = expressConfig;