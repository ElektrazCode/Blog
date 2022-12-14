const express = require('express');
const app = express();
const DB_STRING = 'mongodb+srv://moi:tusaisquoi@cluster0.xnon6sd.mongodb.net/?retryWrites=true&w=majority';
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const flash = require('connect-flash');
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
const logoutController = require('./controllers/logout');
const validateMiddleware = require('./middleware/validateMiddlware');
const authMiddleware = require('./middleware/authMiddleware');
const redirectMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');

global.loggedIn = null;           //global variable that will be accessible from all other files.

mongoose.connect(DB_STRING, { useNewUrlParser: true });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(flash());
app.use(session({ secret: 'keyboard cat' }));
app.use('/posts/store', validateMiddleware);
app.use('*', (req, res, next)=>{         //specifying * wildcard to be used on all requests.
    loggedIn = req.session.userId;       //assigns the logged in user Id to the global variable loggedIn
    next();
});

app.get('/', homeController);
app.get('/about', aboutController);
app.get('/contact', contactController);
app.get('/post', sampleController);
app.get('/posts/new', authMiddleware, newPostController);
app.get('/post/:id', getPostController);
app.post('/posts/search', searchController);
app.post('/posts/store', authMiddleware, storePostController);
app.get('/auth/register', redirectMiddleware, newUserController);
app.get('/auth/login', redirectMiddleware, loginController);
app.get('/auth/logout', logoutController);
app.post('/users/register', redirectMiddleware, storeUserController);
app.post('/users/login', redirectMiddleware, loginUserController);
app.use((req, res)=> res.render('notfound'));

app.listen(4000, () => console.log("App listening on port 4000"));