const express = require('express');

const expressConfig = (app) => {
    app.use('/static', express.static(path.resolve(__dirname, '../public')));
}

module.exports = expressConfig;