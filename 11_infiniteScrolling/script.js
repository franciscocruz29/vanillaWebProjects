/* This code fetches posts from an API, displays them in the DOM, 
allows filtering based on user input, and loads more posts as the user scrolls down the page. */

// Get references to HTML elements using their IDs
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

// Initialize some variables to control the number of posts and the current page
let limit = 5; // Number of posts per page
let page = 1; // Current page

// Function to fetch posts from an API
async function getPosts() {
  // Use the fetch function to make an HTTP GET request to the API
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);

  // Wait for the response, then parse it as JSON
  const data = await res.json();

  // Return the parsed JSON data
  return data;
}

// Function to display posts in the DOM
async function showPosts() {
  const posts = await getPosts(); // Fetch posts

  posts.forEach(post => {
    // Create a new HTML element for each post
    const postEl = document.createElement('div');
    postEl.classList.add('post'); // Add a CSS class to the post element
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;

    // Append the post element to the posts container
    postsContainer.appendChild(postEl);
  });
}

// Function to show a loading indicator and fetch more posts
function showLoading() {
  loading.classList.add('show'); // Display the loading spinner

  setTimeout(() => {
    loading.classList.remove('show'); // Hide the loading spinner

    setTimeout(() => {
      page++; // Increment the page number
      showPosts(); // Fetch and display more posts
    }, 300);
  }, 1000);
}

// Function to filter posts based on user input
function filterPosts(e) {
  const term = e.target.value.toUpperCase(); // Get the filter term from the input field
  const posts = document.querySelectorAll('.post'); // Select all post elements

  posts.forEach(post => {
    // For each post, get the title and body text and convert to uppercase for case-insensitive matching
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    // Check if the filter term is found in the title or body text
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex'; // Show the post
    } else {
      post.style.display = 'none'; // Hide the post
    }
  });
}

// Initial display of posts on page load
showPosts();

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  // Check if the user has scrolled to the bottom of the page
  if (scrollHeight - scrollTop === clientHeight) {
    showLoading(); // Load more posts when scrolling to the bottom
  }
});

// Add an input event listener to the filter input field
filter.addEventListener('input', filterPosts);
