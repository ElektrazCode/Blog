const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) =>{
    let blogposts = await BlogPost.find({});
    res.render('index', {blogposts});
};