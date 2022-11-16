//Create a server with express
const express = require('express');                  //import express package - pulls it from the node_modules directory
const app = express();                               //calls the express function to start a new express app and saves it in a variable
const path = require('path');

//app.use is a special function to increase functionality with Express by adding a function to the application middleware' stack.
app.use(express.static('public'));                  //express.static is a package shipped with Express that helps serve static files specifying the directory that will hold all static files.

app.get('/', (req, res) => {                        //Request handler - handles requests to the url '/' by calling the callback function that handles 2 objects the request and response
    res.sendFile(path.resolve(__dirname, 'home.html')); //it responds to the request by sending the file home.html -- path.resolve get the full path cause it is required by the method sendFile (__dirname & path.resolve, take care of the OS convention / or \ for mac/linux/windows)
});

app.get('/about', (req, res) =>{
    res.sendFile(path.resolve(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'contact.html'));
});

app.get('/testing', (req, res) => {                   //Request handler - handles requests to the url '/about' and responds back with a json object having the attribute name: about
    res.json({
        'Name': 'Testing'
    });
});

app.listen(3000, ()=> console.log('App listening to port 3000'));  //listen to port 3000, express takes care of setting up a server (the http, req and res objects)

