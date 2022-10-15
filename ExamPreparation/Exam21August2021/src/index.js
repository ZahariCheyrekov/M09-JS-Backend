const express = require('express');

const { PORT } = require('./constants');

const app = express();

const routes = require('./routes.js');

require('./config/expressConfig.js')(app);
require('./config/hbsConfig.js')(app);

app.use(routes);

app.listen(PORT, () => console.log(`Server is listening on port http://localhost:${PORT}/`));
