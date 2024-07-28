/**
 * @license Apache-2.0
*/
'use strict';

/**
 * node modules
 */
const mongoose = require('mongoose');

/**
 * custom modules
 */
const Blog = require('../models/blog_model');
const markdown = require('../config/markdown_it_config');

/**
 * 
 * Retrieves and render the detail of a blog.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - Throws an error if there's an issue rendering the home page.
 */
const renderBlogDetail = async (req, res) => {
    try {
        // Destructure blogId from request params
        const { blogId } = req.params;
        
        // Handle case where the provided blogId is not a valid Mongoose ObjectId
        const isValidObjectId = mongoose.Types.ObjectId.isValid(blogId);
        if (!isValidObjectId) {
            return res.render('./pages/404');
        }
        
        // Handles case where no blog found with provided blogId
        const blogExists = await Blog.exists({ _id: new mongoose.Types.ObjectId(blogId) });
        if (!blogExists) {
            return res.render('./pages/404');
        }

        // Retrieve blog detail and populate owner info
        const blog = await Blog.findById(blogId)
            .populate({
                path: 'owner',
                select: 'name username profilePhoto'
            });

        // Retrieve more blog from blog owner
        const ownerBlogs = await Blog.find({ owner: { _id: blog.owner._id } })
            .select('title reaction totalBookmark owner readingTime createdAt')
            .populate({
                path: 'owner',
                select: 'name username profilePhoto'
            })
            // Get more blog without current blog
            .where('_id').nin(blogId)
            .sort({createdAt: 'desc'})
            .limit(3);

        res.render('./pages/blog_detail', {
            sessionUser: req.session.user,
            blog,
            ownerBlogs,
            markdown
        });

    } catch (error) {
        // Log and throw error
        console.log('Error rendering blog detail page:', error.message);
        throw error;
    }
}

module.exports = renderBlogDetail;