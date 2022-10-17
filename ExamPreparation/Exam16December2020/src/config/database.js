const mongoose = require('mongoose');

const config = require('./index.js');

exports.configDatabase = (app) => {
    mongoose.connect(config.CONNECTION_URL, {
        useNewUrlParser: true, useUnifiedTopology: true
    }).then(() =>
        app.listen(config.PORT, () => console.log(`Server is listening on: http://localhost:${config.PORT}`))
    ).catch((error) =>
        console.log(error)
    );
}