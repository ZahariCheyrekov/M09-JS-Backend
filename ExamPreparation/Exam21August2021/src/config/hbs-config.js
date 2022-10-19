const hbs = require('express-handlebars');

const hbsConfig = (app) => {
    app.engine('hbs', hbs.engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
}

module.exports = hbsConfig;