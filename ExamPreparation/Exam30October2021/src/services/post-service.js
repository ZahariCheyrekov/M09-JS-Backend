const Post = require('../models/Post');
const User = require('../models/User');

const userService = require('../services/auth-service');

exports.getOne = async (postId) => {
    return await Post.findById(postId);
}

exports.getAll = async () => {
    return await Post.find().lean();
}

exports.createPost = async (userId, postData) => {
    const post = await Post.create(postData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { myPosts: post._id } },
        { runValidators: true }
    );
}

exports.deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
}