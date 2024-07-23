/**
 * @license Apache-2.0
*/

'use strict';

const $topAppBar = document.querySelector('[data-top-app-bar]');
let lastScrollPos = 0;

/**
 * Attaches event listener to the window scroll event, toggling classes on the top app bar based on scroll position
 */
window.addEventListener('scroll', (event) => {
    // Toggling the 'active' class on the $topAppBar element based on whether the vertical scroll position is greater than 50 pixels
    $topAppBar.classList[window.scrollY > 50 ? 'add' : 'remove']('active');

    // Toggling the 'hide' class based on whether scroll position the vertical scroll position is greater than 50 pixels
    $topAppBar.classList[window.scrollY > lastScrollPos && window.scrollY > 50 ? 'add' : 'remove']('hide');

    // Updating the last recorded scroll position
    lastScrollPos = window.scrollY;
});

/**
 * Toggle menu
 */
const $menuWrapper = document.querySelectorAll('[data-menu-wrapper]');

$menuWrapper?.forEach(function ($menuWrapper) {
    const $menuToggler = $menuWrapper.querySelector('[data-menu-toggler]');
    const $menu = $menuWrapper.querySelector('[data-menu]');

    $menuToggler.addEventListener('click', () => {
        $menu.classList.toggle('active');
    });
});