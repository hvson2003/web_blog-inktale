/**
 * @license Apache-2.0
 * @copyright 2024 sonhoang
*/

'use-strict';

/**
 * node modules
 */
const express = require('express');
require('dotenv').config();

/**
 * custom modules
 */
const register = require('./src/routes/register_route')
const { connectDB, disconnectDB } = require('./src/config/mongoose_config');

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

app.use('/register', register)

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
