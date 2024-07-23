/**
 * @license Apache-2.0
*/

'use strict';

/**
 * Controller function to render the home page with blog data.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws {Error} - Throws an error if there's an issue rendering the home page.
 */
const renderHome = async (req, res) => {
    try {
        res.render('./pages/home', {
            sessionUser: req.session.user
        });
    } catch (error) {
        // Log and throw error if there's an issue rendering the home page

        console.error('Error rendering home page: ', error.message);
        throw error;
    }
}

module.exports = renderHome;