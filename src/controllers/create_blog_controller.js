/**
 * @license Apache-2.0
*/

'use strict';

/**
 * Renders the blog create page.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

const renderCreateBlog = (req, res) => {
    res.render('./pages/create_blog', {
        sessionUser: req.session.user,
        route: req.originalUrl
    })
}

const postCreateBlog = async (req, res) => {
    try {
        // Retrieve title and content from request body
        const { banner, title, content } = req.body;

        // Upload blog banner to Cloudinary
    } catch (error) {
        // Log and throw error if any
        console.error('Error create new blog: ', error.message);
        throw error;
    }
}

module.exports = {
    renderCreateBlog,
    postCreateBlog
}