const router = require('express').Router();

const { isAuth } = require('../middlewares/auth-middleware');
const courseService = require('../services/course-service');

router.get('/create', isAuth, async (req, res) => {
    res.render('course/create');
});

router.post('/create', isAuth, async (req, res) => {
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

router.get('/:courseId/enroll', isAuth, async (req, res) => {
    const courseId = req.params.courseId;

    await courseService.enrollCourse(req.user._id, courseId);

    res.redirect(`/courses/${courseId}/details`);
});

router.get('/:courseId/edit', isAuth, async (req, res) => {
    const course = await courseService.getOne(req.params.courseId);

    res.render('course/edit', { ...course.toObject() });
});

router.post('/:courseId/edit', isAuth, async (req, res) => {
    const courseId = req.params.courseId;

    await courseService.editCourse(courseId, req.body);

    res.redirect(`/courses/${courseId}/details`);
});

router.get('/:courseId/delete', isAuth, async (req, res) => {
    await courseService.deleteCourse(req.params.courseId);

    res.redirect('/');
});

module.exports = router;