const mongoose = require('mongoose');

const { CONNECTION_URL } = require('../constants');

exports.configDatabase = configDatabase = (app, PORT) => {
    return mongoose.connect(CONNECTION_URL)
        .then(() => {
            app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}/`));
        })
        .catch(error => {
            console.log(error);
        });
}
