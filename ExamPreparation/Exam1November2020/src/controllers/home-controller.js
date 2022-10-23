const router = require('express').Router();

const courseService = require('../services/course-service');

router.get('/', async (req, res) => {
    if (req.user) {
        const courses = await courseService.getTopCourses();
        res.render('home/user-home', { courses });

    } else {
        const courses = await courseService.getAll();
        res.render('home/guest-home', { courses });
    }
});

module.exports = router;