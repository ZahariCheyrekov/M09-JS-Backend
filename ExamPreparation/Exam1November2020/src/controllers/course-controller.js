const router = require('express').Router();

const courseService = require('../services/course-service');

router.get('/create', async (req, res) => {
    res.render('course/create');
});

router.post('/create', async (req, res) => {
    try {
        await courseService.createCourse(req.body)
        res.redirect('/');

    } catch (error) {
        const errors = [];

        for (const { properties } of Object.values(error.errors)) {
            errors.push({ 'error': properties.message });
        }

        res.render('course/create', { errors });
    }
});

module.exports = router;