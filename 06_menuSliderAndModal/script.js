// Get references to the relevant HTML elements using their IDs
const toggle = document.getElementById('toggle');
const close = document.getElementById('close');
const open = document.getElementById('open');
const modal = document.getElementById('modal');
const navbar = document.getElementById('navbar');

// This function closes the navbar if the user clicks anywhere outside of the navbar once it's opened.
// It also makes sure to remove the event listener after usage to avoid unused listeners.
function closeNavbar(e) {
  // Check if the navbar is currently open and if the click is not on the toggle button or inside the toggle button.
  // Additionally, the click should not be on the navbar or inside the navbar to close it.
  if (
    document.body.classList.contains('show-nav') &&
    e.target !== toggle &&
    !toggle.contains(e.target) &&
    e.target !== navbar &&
    !navbar.contains(e.target)
  ) {
    // If the above conditions are met, toggle the 'show-nav' class on the body element to close the navbar.
    document.body.classList.toggle('show-nav');
    // Remove the event listener to prevent it from affecting future clicks.
    document.body.removeEventListener('click', closeNavbar);
  } else if (!document.body.classList.contains('show-nav')) {
    // If the navbar is not open, just remove the event listener to avoid unnecessary calls.
    document.body.removeEventListener('click', closeNavbar);
  }
}

// Toggle nav
toggle.addEventListener('click', () => {
  // When the toggle button is clicked, toggle the 'show-nav' class on the body element.
  document.body.classList.toggle('show-nav');
  // Add an event listener to the body to detect clicks and call the closeNavbar function to close the navbar if necessary.
  document.body.addEventListener('click', closeNavbar);
});

// Show modal
open.addEventListener('click', () => {
  // When the 'open' element (probably a button to open the modal) is clicked,
  // add the 'show-modal' class to the 'modal' element to make it visible.
  modal.classList.add('show-modal');
});

// Hide modal
close.addEventListener('click', () => {
  // When the 'close' element (probably a button inside the modal to close it) is clicked,
  // remove the 'show-modal' class from the 'modal' element to hide it.
  modal.classList.remove('show-modal');
});

// Hide modal on outside click
window.addEventListener('click', e => {
  // When a click event happens on the window (outside the modal),
  // check if the click target is the modal element or any of its children.
  // If so, remove the 'show-modal' class from the 'modal' element to hide it.
  e.target == modal ? modal.classList.remove('show-modal') : false;
});
