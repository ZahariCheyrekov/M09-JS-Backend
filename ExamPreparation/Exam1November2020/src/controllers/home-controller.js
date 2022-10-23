const router = require('express').Router();

const courseService = require('../services/course-service');

router.get('/', async (req, res) => {
    if (req?.query?.course) {
        const courses = await courseService.getCoursesByTitle(req.query.course);
        res.render('home/user-home', { courses });
    } else {
        if (req.user) {
            const courses = await courseService.getTopCourses();
            res.render('home/user-home', { courses });

        } else {
            const courses = await courseService.getAll();
            res.render('home/guest-home', { courses });
        }
    }
});

router.post('/', async (req, res) => {
    // const courses = await courseService.searchCourses();
    // res.render('home/user-home', { courses });
    console.log(req.url, req.query);

});

module.exports = router;