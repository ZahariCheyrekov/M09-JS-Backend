const router = require('express').Router();

const theaterService = require('../services/theater-service');

router.get('/', async (req, res) => {
    if (req.user) {
        let theaters;

        if (req.query.date) {
            theaters = await theaterService.getTheatersByDate();

        } else if (req.query.likes) {
            theaters = await theaterService.getTheatersByLikes();

        } else {
            theaters = await theaterService.getAll();
        }

        res.render('home/user-home', { theaters });

    } else {
        const theaters = await theaterService.getTopTheaters();
        res.render('home/guest-home', { theaters });
    }
});

module.exports = router;