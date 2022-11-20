const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const DB_STRING = "mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority"  //saving the DB connection string from MongoDB in a variable


mongoose.connect(DB_STRING,{ useNewUrlParser: true });

app.use('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res)=>{
    res.render('about');
})

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/post', (req, res) => {
    res.render('post');
})

app.listen(4000, () => console.log('App listening to port 4000'));



const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-paser');


mongoose.connect(DB_STRING, { newUrlParser: true});



app.use('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlEncoded({extended: true}));


app.get('/', (req, res)=> {
    res.render('index');
});

app.listen(4000, (error)=> console.log('App listening on port 4000', error));