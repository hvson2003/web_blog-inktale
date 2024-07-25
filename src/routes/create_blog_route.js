/**
 * @license Apache-2.0
*/
'use strict';

/**
 * node modules
 */
const router = require('express').Router();

/**
 * custom modules
 */
const { postCreateBlog, renderCreateBlog } = require('../controllers/create_blog_controller');

// GET route: Render the blog page
router.get('/', renderCreateBlog);

// POST route: create new blog post
router.post('/', postCreateBlog);

module.exports = router;