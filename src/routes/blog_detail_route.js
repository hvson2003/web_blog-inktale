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
const renderBlogDetail = require('../controllers/blog_detail_controller');

// GET route: Render the blog detail page
router.get('/:blogId', renderBlogDetail);

module.exports = router;