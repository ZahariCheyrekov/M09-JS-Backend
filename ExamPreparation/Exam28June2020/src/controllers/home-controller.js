const router = require('express').Router();

const theaterService = require('../services/theater-service');

router.get('/', async (req, res) => {
    if (req.user) {
        const theaters = await theaterService.getAll();
        res.render('home/user-home', { theaters });

    } else {
        const theaters = await theaterService.getTopTheaters();
        res.render('home/guest-home', { theaters });
    }
});

module.exports = router;