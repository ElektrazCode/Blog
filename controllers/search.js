const BlogPost = require('../models/BlogPost');

module.exports = async (req, res) =>{
    const keyword = new RegExp(req.body.keyword, 'i');
    const blogposts = await BlogPost.find({title: keyword});
    res.render('index', {blogposts});
};