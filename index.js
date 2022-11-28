const express = require('express'); //import express package - pulls it from the node_modules directory
const app = new express(); //calls the express function to start a new express app and saves it in a variable
const ejs = require('ejs');
const mongoose = require('mongoose');
const DB_STRING = "mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority"  //saving the DB connection string in a variable
const bodyParser = require('body-parser'); //
// const fileUpload = require('express-fileupload');    //Adds the files property to the request object to access uploaded file with req.files
const BlogPost = require('./models/BlogPost');

mongoose.connect(DB_STRING, {useNewUrlParser:true});
app.set('view engine', 'ejs');

app.use(express.static('public')); //specifying location of static assets in the public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());             //register the package in express

app.get('/', async (req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    const blogposts = await BlogPost.find({});
    console.log("Here are the posts: ", blogposts);
    res.render('index', { blogposts });
})

app.get('/about', (req, res)=>{ //Calls the handler callback function after the request for '/about' comes in 
    res.render('about');
})

app.get('/contact', (req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    res.render('contact');
})

//Go to specific post's page
app.get('/post/:id', async(req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', { blogpost });
})

//Go to page to create a new post
app.get('/posts/new', (req, res)=> {
    res.render('create');
});

//Save a new post into DB and redirect to main page
app.post('/posts/store', async (req, res)=>{
    console.log(req.body);
    await BlogPost.create((req.body));  //Creates a new document in DB and Saves the post data in it
    res.redirect('/');                  //Express adds the redirect method to the response object for convenience, with only Node it will need a lot more code
});

app.post('/posts/search', async (req, res)=> {
    const keyword = new RegExp(req.body.keyword, 'i');
    const blogposts = await BlogPost.find({title: keyword});
    res.render('index', { blogposts });
});

// app.post('/posts/store', async (req, res)=>{
//    console.log(req.files.image);
//    const image = req.files.image;                    //mv method moves the file elsewhere on the server and names it
//     image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error)=>{
//         await BlogPost.create({...req.body, image:'/assets/img/'+ image.name});
//         res.redirect('/');
//     })
// })

app.listen(4000, () => console.log("App listening on port 4000"));

//instead of using a callback inside a callback we can use async await
    //BlogPost.create(req.body, (error, blogpost)=>{     
        //res.redirect('/');  
    //}); 