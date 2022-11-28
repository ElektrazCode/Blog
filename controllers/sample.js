const BlogPost = require("../models/BlogPost");

module.exports = async (req, res) => {
    let blogposts = await BlogPost.find();
    let blogpost = blogposts[0];
    res.render('post', {blogpost});
};