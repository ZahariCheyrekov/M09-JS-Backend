const router = require('express').Router();

const theaterService = require('../services/theater-service');

router.get('/create', (req, res) => {
    res.render('theater/create');
});

router.post('/create', async (req, res) => {
    console.log(req.body)
    try {
        const isTheaterPublic = req.body.isPublic === 'on' ? true : false;
        req.body.isPublic=isTheaterPublic;
        
        await theaterService.createTheater({ ...req.body, author: req.user._id });
        res.redirect('/');

    } catch (error) {
        // const errors = [];

        // for (const { properties } of Object.values(error.errors)) {
        //     errors.push({ 'error': properties.message });
        // }

        // res.render('theater/create', { errors });
        console.log(error);
    }
});

module.exports = router;