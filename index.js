const express = require('express'); //import express package - pulls it from the node_modules directory
const app = new express(); //calls the express function to start a new express app and saves it in a variable
const ejs = require('ejs');
const mongoose = require('mongoose');
const DB_STRING = "mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority"  //saving the DB connection string in a variable
const bodyParser = require('body-parser'); //
// const fileUpload = require('express-fileupload');    //Adds the files property to the request object to access uploaded file with req.files
const BlogPost = require('./models/BlogPost');

mongoose.connect(DB_STRING, {useNewUrlParser:true});
console.log('Connected to DB!');
app.set('view engine', 'ejs');

app.use(express.static('public')); //specifying location of static assets in the public folder
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(fileUpload());             //register the package in express

app.get('/', async (req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    const blogposts = await BlogPost.find({});
    console.log(blogposts);
    res.render('index', { blogposts });
})

// app.get('/about', (req, res)=>{ //Calls the handler callback function after the request for '/about' comes in 
//     // res.sendFile(path.resolve(__dirname, 'pages/about.html')); //res.sendFile('index.js') will throw an error cause need a full path
//     res.render('about');
// })

// app.get('/contact', (req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
//     // res.sendFile(path.resolve(__dirname, 'pages/contact.html')); //res.sendFile('index.js') will throw an error cause need a full path
//     res.render('contact');
// })

// app.get('/post/:id', async(req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
//     // res.sendFile(path.resolve(__dirname, 'pages/post.html')); //res.sendFile('index.js') will throw an error cause need a full path
//     const blogpost = await BlogPost.findById(req.params.id);
//     res.render('post', { blogpost });
// })

app.get('/posts/new', (req, res)=> {
    res.render('create');
});

app.post('/posts/store', (req, res)=>{
    console.log(req.body);
    res.redirect('/');
});

// app.post('/posts/search', async (req, res)=> {
//     const keyword = new RegExp(req.body.keyword, 'i');
//     const blogposts = await BlogPost.find({title: keyword});
//     res.render('index', { blogposts });
// });

// app.post('/posts/store', async (req, res)=>{
//    console.log(req.files.image);
//    const image = req.files.image;                    //mv method moves the file elsewhere on the server and names it
//     image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error)=>{
//         await BlogPost.create({...req.body, image:'/assets/img/'+ image.name});
//         res.redirect('/');
//     })
// })

app.listen(4000, () => console.log("App listening on port 4000"));