const mongoose = require('mongoose');          //bringing in mongoose
const BlogPost = require('./models/BlogPost'); //setting the path to the model
const DB_STRING = "mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority"  //saving the DB connection string in a variable

mongoose.connect(DB_STRING, {useNewUrlParser: true});  //connecting to the DB.

//Creating / Inserting a new blog using the create method of the BlogPost model
// BlogPost.create({
//     title: 'Hello',
//     body: 'Nothing to say'
// }, (error, blogpost) => console.log(error, blogpost));

BlogPost.findByIdAndDelete({_id:"632f642a7b44b860797deb9e"}, (error, blogpost) => console.log(error, blogpost));