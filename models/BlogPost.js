const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    username: String,
    datePosted:{
        type: Date,
        default: new Date()
    },
    image: String
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);