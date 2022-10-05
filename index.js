// const http = require('http');  //import http core module package and stores it in the http constant
// const fs = require('fs');   //import fileSystem core module and store it into a constant
const express = require('express'); //import express package - pulls it from the node_modules directory
const path = require('path'); //import path core module which ensures the correct reference to a directory regardless of the OS.
const ejs = require('ejs');
const app = new express(); //calls the express function to start a new express app and saves it in a variable
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const BlogPost = require('./models/BlogPost.js');
const DB_STRING = "mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority"  //saving the DB connection string in a variable
const fileUpload = require('express-fileupload');    //Adds the files property to the request object to access uploaded file with req.files

// const homePage = fs.readFileSync('index.html');  //read index.html file and store it in a variable
// const aboutPage = fs.readFileSync('about.html'); //read about.html file and store it in a variable
// const contactPage = fs.readFileSync('contact.html'); //read contact.html file and store it in a variable
// const notFoundPage = fs.readFileSync('notfound.html'); //read notfound.html file and store it in a variable

mongoose.connect(DB_STRING, {useNewUrlParser:true});

app.use(fileUpload());             //register the package in express
app.use(express.static('public')); //
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.set('view engine', 'ejs');
//
app.get('/', async (req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    // res.sendFile(path.resolve(__dirname, 'pages/index.html')); //res.sendFile('index.js') will throw an error cause need a full path
    const blogposts = await BlogPost.find({});
    res.render('index', { blogposts });
})

app.get('/about', (req, res)=>{ //Calls the handler callback function after the request for '/about' comes in 
    // res.sendFile(path.resolve(__dirname, 'pages/about.html')); //res.sendFile('index.js') will throw an error cause need a full path
    res.render('about');
})

app.get('/contact', (req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    // res.sendFile(path.resolve(__dirname, 'pages/contact.html')); //res.sendFile('index.js') will throw an error cause need a full path
    res.render('contact');
})

app.get('/post/:id', async(req, res)=>{  //Calls the handler callback function after the request for '/' comes in 
    // res.sendFile(path.resolve(__dirname, 'pages/post.html')); //res.sendFile('index.js') will throw an error cause need a full path
    const blogpost = await BlogPost.findById(req.params.id);
    res.render('post', { blogpost });
})

app.get('/posts/new', (req, res)=> {
    res.render('create');
});

app.post('/posts/search', async (req, res)=> {
    const keyword = new RegExp(req.body.keyword, 'i');
    const blogposts = await BlogPost.find({title: keyword});
    res.render('index', { blogposts });
});

app.post('/posts/store', async (req, res)=>{
    console.log(req.files);
    console.log(req.image);
    const image = req.files.image;                    //mv method moves the file elsewhere on the server and names it
    image.mv(path.resolve(__dirname, 'public/assets/img', image.name), async (error)=>{
        await BlogPost.create({...req.body, image:'/assets/img/'+ image.name});
        res.redirect('/');
    })
})
// const server = http.createServer((req, res) => {  //create a server with the createServer method of the http package and assign it to the variable server. That method takes in a callback function with 2 objects as arguments: the request from the browser and the response sent back to the browser
//     if(req.url === '/about')
//         res.end(aboutPage); //end the response and serve the aboutPage 
//     else if(req.url === '/contact')
//         res.end(contactPage); //end the response and serve the contactPage
//     else if(req.url === '/')
//         res.end(homePage); //end the response and serve the homePage
//     else {
//         res.writeHead(404); //respond in the header with code 404 for page not found
//         res.end(notFoundPage); //end the response and serve the notFoundPage
//     }
//     console.log(req.url); //log to the console the request url
// })

// server.listen(3000);  //let server listen on port 3000;
app.listen(4000, () => console.log("App listening on port 4000"))