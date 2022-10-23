const Course = require('../models/Course');

exports.getOne = async (courseId) => {
    return await Course.findById(courseId);
}

exports.getTopCourses = async () => {
    return await Course
        .find()
        .sort({ usersEnrolled: -1, createdAt: 1 })
        .lean();
}

exports.getCoursesByTitle = async (name) => {
    return await Course
        .find({ title: { $regex: name, $options: 'i' } })
        .sort({ createdAt: -1 })
        .lean();
}

exports.getAll = async () => {
    return await Course
        .find()
        .sort({ createdAt: 1 })
        .lean();
}

exports.createCourse = async (courseData) => {
    return await Course.create(courseData);
}

exports.enrollCourse = async (userId, courseId) => {
    return await Course.findByIdAndUpdate(
        { _id: courseId },
        { $push: { usersEnrolled: userId } },
        { runValidators: true }
    );
}

exports.editCourse = async (courseId, courseData) => {
    return await Course.findByIdAndUpdate(courseId, courseData);
}

exports.deleteCourse = async (courseId) => {
    return await Course.findByIdAndDelete(courseId);
}