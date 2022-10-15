const path = require('path');
const { engine } = require('express-handlebars');

const hbsConfig = (app) => {
    app.engine('hbs', engine({
        extname: 'hbs'
    }));

    app.set('views', path.resolve(__dirname, '../views'));
    app.set('view engine', 'hbs');
}

module.exports = hbsConfig;