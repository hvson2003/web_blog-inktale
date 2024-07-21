/**
 * @license Apache-2.0
 * @copyright 2024 sonhoang
*/

'use strict';

const $form = document.querySelector('[data-form]');
const $submitBtn = document.querySelector('[data-submit-btn]');

// Handing sign-up form submission
$form.addEventListener('submit', async (event) => {
    // Preventing default form submission behavior
    event.preventDefault();

    // Disabling submit button to prevent multiple submission
    $submitBtn.setAttribute('disabled', '');

    // Creating FormData object to capture form data
    const formData = new FormData($form);
    console.log(formData.get('password'));

    //Handing case where password and confirm password fields doesn't match
    if (formData.get('password') !== formData.get('confirm_password')) {
        // Enable submit button and show error message
        $submitBtn.removeAttribute('disabled');
        // Should be a snackbar
        console.error('Please ensure your password and confirm password fields contain the same value.');

    }
});
