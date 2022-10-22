const Post = require('../models/Post');
const User = require('../models/User');

const userService = require('../services/auth-service');

exports.getOne = async (postId) => {
    return await Post.findById(postId);
}

exports.getAll = async () => {
    return await Post.find().lean();
}

exports.getPeopleEmails = async (postId) => {
    const emails = [];

    const { votes } = await this.getOne(postId);

    for (const vote of votes) {
        const email = await userService.getUserEmail(vote);
        emails.push(email);
    }

    return emails.join(', ');
}

exports.createPost = async (userId, postData) => {
    const post = await Post.create(postData);

    return await User.findByIdAndUpdate(
        { _id: userId },
        { $push: { myPosts: post._id } },
        { runValidators: true }
    );
}

exports.upvote = async (postId, userId) => {
    return await Post.findByIdAndUpdate(
        { _id: postId },
        {
            $push: { votes: userId },
            $inc: { rating: 1 }
        },
        { runValidators: true }
    );
}

exports.downvote = async (postId, userId) => {
    return await Post.findByIdAndUpdate(
        { _id: postId },
        {
            $push: { votes: userId },
            $inc: { rating: -1 }
        },
        { runValidators: true }
    );
}

exports.deletePost = async (postId) => {
    return await Post.findByIdAndDelete(postId);
}