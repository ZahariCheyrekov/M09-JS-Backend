const express = require('express');

const { PORT } = require('./config/env');

const app = express();

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
