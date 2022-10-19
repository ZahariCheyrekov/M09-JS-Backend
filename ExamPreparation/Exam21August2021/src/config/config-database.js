const mongoose = require('mongoose');

const configDatabase = (app, PORT) => {
    mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => app.listen(PORT, () => console.log(`Server is listening on: http://localhost:${PORT}`)))
        .catch((error) => console.log(error));
}

module.exports = configDatabase;