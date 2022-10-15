const express = require('express');

const { PORT } = require('./constants');

const app = express();

require('./config/expressConfig.js')(app);
require('./config/hbsConfig.js')(app);


app.get('/', (req, res) => {
    res.render('home');
});

app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}/`));
