/**
 * @license Apache-2.0
*/

'use-strict';

/**
 * node modules
 */
const express = require('express');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');

/**
 * custom modules
 */
const register = require('./src/routes/register_route');
const login = require('./src/routes/login_route');
const { connectDB, disconnectDB } = require('./src/config/mongoose_config');
const home = require('./src/routes/home_route');
const createBlog = require('./src/routes/create_blog_route');
const logout = require('./src/routes/logout_route');
const userAuth = require('./src/middlewares/user_auth_middleware');
const blogDetail = require('./src/routes/blog_detail_route');

/**
* Initial express
*/
const app = express();

/**
 * setting view engine
 */
app.set('view engine', 'ejs')

/**
 * set public directory
 */
app.use(express.static(`${__dirname}/public`));

/**
 * parse urlencoded body
 */
app.use(express.urlencoded({ extended: true }));

/**
 * parse json bodies
 */
app.use(express.json({ limit: '10mb' }));

/**
 * instance for session storage
 */
const store = new MongoStore({
    mongoUrl: process.env.MONGO_CONNECTION_URI,
    collectionName: 'sessions',
    dbName: 'inktale'
})

/**
 * initial express session
 */
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: Number(process.env.SESSION_MAX_AGE)
    }
}));

/**
 * home page
 */
app.use('/', home);

/**
 * register page
 */
app.use('/register', register);

/**
 * login page 
 */
app.use('/login', login);

/**
 * logout page 
 */
app.use('/logout', logout);

/** 
 * blog detail page
*/
app.use('/blogs', blogDetail);

/** 
 * user authorization 
*/
app.use(userAuth);

/**
 * create blog page
 */
app.use('/createblog', createBlog);

// app.get('/',(req, res)=>{
//     res.send('<h1>Hello world!</h1>')
// })


/**
 * start server
 */
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    await connectDB(process.env.MONGO_CONNECTION_URI);
});

server.on('close', async () => { await disconnectDB(); });
