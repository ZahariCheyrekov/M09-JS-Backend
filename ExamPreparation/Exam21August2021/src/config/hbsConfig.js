const { engine } = require('express-handlebars');

const hbsConfig = (app) => {
    app.engine('hbs', engine({
        extname: 'hbs'
    }));

    app.set('views', './src/views');
    app.set('view engine', 'hbs');
}

module.exports = hbsConfig;