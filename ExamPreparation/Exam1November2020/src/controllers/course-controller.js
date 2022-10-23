const router = require('express').Router();

const courseService = require('../services/course-service');

router.get('/create', async (req, res) => {
    res.render('course/create');
});

router.post('/create', async (req, res) => {
    try {
        await courseService.createCourse({ ...req.body, owner: req.user._id });
        res.redirect('/');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('course/create', { errors });
    }
});

router.get('/:courseId/details', async (req, res) => {
    const course = await courseService.getOne(req.params.courseId);

    const isOwner = String(course.owner) === req.user?._id;
    const isEnrolled = course.usersEnrolled.some(user => String(user) === req.user?._id);

    res.render('course/details', { ...course.toObject(), isOwner, isEnrolled });
});

router.get('/:courseId/enroll', async (req, res) => {
    const courseId = req.params.courseId;

    await courseService.enrollCourse(req.user._id, courseId);

    res.redirect(`/courses/${courseId}/details`);
});

router.get('/:courseId/delete', async (req, res) => {
    await courseService.deleteCourse(req.params.courseId);

    res.redirect('/');
});

module.exports = router;