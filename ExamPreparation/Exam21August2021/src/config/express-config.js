const path = require('path');
const express = require('express');

const expressConfig = (app) => {
    app.use('/static', express.static(path.resolve(__dirname, '../public')));
    app.use(express.urlencoded({ extended: true }));
}

module.exports = expressConfig;