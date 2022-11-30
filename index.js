const express = require('express');
const app = express();
const DB_STRING = 'mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const aboutController = require('./controllers/about');
const contactController = require('./controllers/contact');
const sampleController = require('./controllers/sample');
const homeController = require('./controllers/home');
const getPostController = require('./controllers/getPost');
const searchController = require('./controllers/search');
const storePostController = require('./controllers/storePost');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const validateMiddleware = require('./middleware/validateMiddlware');

mongoose.connect(DB_STRING, {useNewUrlParser: true});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());
app.use('/posts/store', validateMiddleware);

app.get('/', homeController);
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/post', sampleController);
app.get('/posts/new', newPostController);
app.get('/post/:id', getPostController);
app.post('/posts/search', searchController);
app.post('/posts/store', storePostController);
app.get('/auth/register', newUserController);
app.get('/auth/login', loginController);
app.post('/users/register', storeUserController);
app.post('/users/login', loginUserController);

app.listen(4000, () => console.log("App listening on port 4000"));