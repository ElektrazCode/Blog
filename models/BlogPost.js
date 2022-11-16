const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
    title: String,
    body: String,
    username: String,
    image: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('BlogPost', BlogPostSchema);