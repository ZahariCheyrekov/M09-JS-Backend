const express = require('express');

const app = express();

require('./config/expressConfig.js')(app);
require('./config/hbsConfig.js')(app);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.render('home', { layout: false });
});

app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}/`));
