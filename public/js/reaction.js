/**
 * @license Apache-2.0
*/

'use strict';

/**
 * custom module
 */

const $reactionBtn = document.querySelector('[data-reaction-btn]');
const $reactionNumber = document.querySelector('[data-reaction-number]');

/**
 * Adds a reaction to the current blog.
 * This function sends a PUT request to the reactions endpoint to add a reaction.
 * If the response is successful (status code 200), it activates the reaction button.
 * and increases the reaction count displayed on the page.
 * If the response status is 401 (Unauthorized), it prompts the user to log in. 
 * 
 * @function addReaction
 * @throws {Error} If there is an error during the process, it will be logged.
 */
const addReaction = async () => {
    try {
        // Send a put request to the reaction endpoint
        const response = await fetch(`${window.location}/reactions`, {
            method: 'PUT'
        });

        // Handle case where response is successful
        if (response.ok) {
            $reactionBtn.classList.add('active', 'reaction-anim-add');
            $reactionBtn.classList.remove('reaction-anim-remove');
            $reactionNumber.textContent = Number($reactionNumber.textContent) + 1;
        }

        // Handle case where response is 401 (Unauthorized)
        if (response.status === 401) {
            // Show dialog for login
            console.log('Need to login');
        }

    } catch (error) {
        // Log any error
        console.log('Error adding reaction: ', error.message);
    }
}

/**
 * Remove a reaction from the current blog.
 * Sends a DELETE request to the reactions endpoint.
 * Updates UI accordingly based on server response.
 * 
 * @function removeReaction
 * @throws {Error} If an error occurs during the process.
 */
const removeReaction = async () => {
    try {
        // Send a DELETE request to the reactions endpoint
        const response = await fetch(`${window.location}/reactions`, {
            method: 'DELETE'
        });

        // HAndle case where response is successful
        if (response.ok) {
            // Inactive reaction button and decrease the reaction number
            $reactionBtn.classList.add('reaction-anim-remove');
            $reactionBtn.classList.remove('active', 'reaction-anim-add');
            $reactionNumber.textContent = Number($reactionNumber.textContent) - 1;
        }

    } catch (error) {
        console.error('Error remove reactions: ', error.message);
    }
}


// Add event listener for click event
$reactionBtn.addEventListener('click', async function () {
    $reactionBtn.setAttribute('disabled', '');

    if (!$reactionBtn.classList.contains('active')) {
        await addReaction();
    } else{
        await removeReaction();
    }

    $reactionBtn.removeAttribute('disabled');
});