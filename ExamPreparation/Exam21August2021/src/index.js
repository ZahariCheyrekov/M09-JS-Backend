const express = require('express');

const app = express();

require('./config/hbsConfig.js')(app);

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}/`));
