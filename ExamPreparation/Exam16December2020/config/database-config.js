const mongoose = require('mongoose');
const { CONNECTION_URL } = require('./index');

exports.configDatabase = (app, PORT) => {
    mongoose.connect(CONNECTION_URL)
        .then(() => {
            app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}/`));
        })
        .catch(error => {
            console.log(error);
        });
}
