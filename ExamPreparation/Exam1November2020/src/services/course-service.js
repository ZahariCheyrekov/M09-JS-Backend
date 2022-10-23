const Course = require('../models/Course');

exports.getTopCourses = async () => {
    return await Course.find().sort({ usersEnrolled: -1, createdAt: 1 }).lean();
}

exports.getAll = async () => {
    return await Course.find({ createdAt: -1 }).lean();
}