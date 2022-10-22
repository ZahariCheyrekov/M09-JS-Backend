const Post = require('../models/Post');

exports.getAll = async () => {
    return await Post.find().lean();
}