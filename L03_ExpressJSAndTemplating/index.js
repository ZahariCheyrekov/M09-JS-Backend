const express = require('express');

const app = express();

const cats = ['Tom, Garfield, Lin'];

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/cats', (req, res) => {
    if (cats.length > 0) {
        res.send('No cats :(');
    }

    res.send(cats.join(', '));
});

app.post('/cats', (req, res) => {
    //TODO: Implement posting cat function logic

    res.send('Add new cat to the collection.');
});

app.put('/cats', (req, res) => {
    //TODO: Implement modify cat request function

    res.send('Modify existing cat');
});

app.all('*', (req, res) => {
    res.status(404);
    res.send('404 page not found :(');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));