const Blog = require('../models/Blog');
const { User } = require('../models/User');

exports.getOne = async (blogId) => {
    return await Blog.findById(blogId);
}

exports.getAll = async () => {
    return await Blog.find().lean();
}

exports.getAllFollowers = async (blogId) => {
    const { followList } = await Blog.findById(blogId);

    const usersNames = [];

    for (const userId of followList) {
        const { email } = await User.findById(userId);
        usersNames.push(email);
    }

    return usersNames.join(', ');
}

exports.getTopBlogs = async () => {
    return await Blog.find().sort({ createdAt: -1 }).limit(3).lean();
}

exports.getUserFollowedBlogs = async (userId) => {
    return await Blog.find({ followList: { $in: userId } }).lean();
}

exports.getUserCreatedBlogs = async (userId) => {
    return await Blog.find({ owner: userId }).lean();
}

exports.createBlog = async (blogData) => {
    return await Blog.create(blogData);
}

exports.followBlog = async (blogId, userId) => {
    return await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $push: { followList: userId } },
        { runValidators: true }
    );
}

exports.editBlog = async (blogId, blogData) => {
    return await Blog.findByIdAndUpdate(blogId, blogData);
}

exports.deleteBlog = async (blogId) => {
    return await Blog.findByIdAndDelete(blogId);
}