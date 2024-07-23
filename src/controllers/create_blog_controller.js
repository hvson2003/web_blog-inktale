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
    res.render('./pages/create_blog)', {
        sessionUser: req.session.user,
        route: req.originalUrl
    })
}

module.exports = {
    renderCreateBlog
}