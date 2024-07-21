/**
 * @license Apache-2.0
 * @copyright 2024 sonhoang
*/

'use-strict';

/**
 * node modules
 */
const express = require('express');

/**
 * custom modules
 */

const register = require('./src/routes/register_route')

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

app.use('/register', register)

// app.get('/',(req, res)=>{
//     res.send('<h1>Hello world!</h1>')
// })

/**
 * start server
 */
app.listen(3000, () => {
    console.log('Server is running on port 3000');
})