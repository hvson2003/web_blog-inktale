/**
 * @license Apache-2.0
*/
'use strict';

/**
 * custom module
 */
const User = require('../models/user_model');
const Blog = require('../models/blog_model');

/**
 * Add a blog post to the reading list of the logged-in user and update the total bookmark count of the blog.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} - If an error occurs during the process. 
 */
const addToReadingList = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.session.user) return res.sendStatus(401);

        // Retrieve logged client username and current blogId
        const { username } = req.session.user;
        const { blogId } = req.params;

        /**
         * Find current logged user and check,
         * if already added current blog to reading list
         */
        const loggedUser = await User.findOne({ username })
            .select('readingList');
        if (loggedUser.readingList.includes(blogId)) {
            res.sendStatus(400);
        }

        // Update logged user reading list and save
        loggedUser.readingList.push(blogId);
        await loggedUser.save();

        // Find the totalBookmark and update
        const readingListedBlog = await Blog.findById(blogId)
            .select('totalBookmark')
        readingListedBlog.totalBookmark++;
        await readingListedBlog.save();

        res.sendStatus(200);

    } catch (error) {
        // Log error
        console.log('Error updating reading list: ', error.message);
        throw error;
    }
}

/**
 * Remove a blog from the reading list of the logged-in user and decrements the total bookmark count of the blog.
 * 
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @throws {Error} - Throws an error if an operation fails. 
 */
const removeFromReadingList = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.session.user) return res.sendStatus(401);

        // Retrieve logged client client username and current blogId
        const { username } = req.session.user;
        const { blogId } = req.params;

        // Handle case where blog is not contain in reading list
        const loggedUser = await User.findOne({ username })
            .select('readingList')
        if (!loggedUser.readingList.includes(blogId)) {
            return res.sendStatus(400);
        }

        // Update user reading list and save
        loggedUser.readingList.splice(loggedUser.readingList.indexOf(blogId), 1);
        await loggedUser.save();

        // Find the totalBookmark and update
        const readingListedBlog = await Blog.findById(blogId)
            .select('totalBookmark');
        readingListedBlog.totalBookmark--;
        await readingListedBlog.save();

        res.sendStatus(200);

    } catch (error) {
        // Log error
        console.error('Error removing from reading list: ', error.message);
        throw error;
    }
}

module.exports = {
    addToReadingList,
    removeFromReadingList
}