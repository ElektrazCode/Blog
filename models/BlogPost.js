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


module.exports = mongoose.model('BlogPost', BlogPostSchema);  //we access the database through mongoose.model, first argument is the name of the collection and the second argument is the schema
//exporting the model makes it accessible to other files.