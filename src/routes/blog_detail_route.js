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
const { updateReaction, deleteReaction } = require('../controllers/reaction_controller');
const { addToReadingList, removeFromReadingList } = require('../controllers/reading_list_controller');

// GET route: Render the blog detail page
router.get('/:blogId', renderBlogDetail);

// PUT route: Update blog reactions
router.put('/:blogId/reactions', updateReaction);

// DELETE route: Delete blog reactions
router.delete('/:blogId/reactions', deleteReaction);

// PUT route: Add blog reading list
router.put('/:blogId/readingList', addToReadingList);

// DELETE route: Delete blog reactions
router.delete('/:blogId/readingList', removeFromReadingList);

module.exports = router;