const express = require('express');

const app = express();
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine());

const cats = [];


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/cats', (req, res) => {
    if (cats.length === 0) {
        res.send('No cats :(');
    }

    res.send(cats.join(', '));
});

app.post('/cats/:catName', (req, res) => {
    const cat = req.params.catName;
    cats.push(cat);

    res.status(201);
    res.send(`${cat} was successfully added to the collection! :)`);
});

app.put('/cats', (req, res) => {
    //TODO: Implement cat modify functionallity

    res.send('Cat was modified.');
});

app.all('*', (req, res) => {
    res.status(404);
    res.send('404 page not found :(');
});

app.listen(5000, () => console.log('Server is listening on port 5000...'));