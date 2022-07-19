const express = require('express');

const app = express();

const cats = ['Tom, Garfield, Lin'];

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/cats', (req, res) => {
    if (cats.length === 0) {
        res.send('No cats :(');
    }

    res.send(cats.join(', '));
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));