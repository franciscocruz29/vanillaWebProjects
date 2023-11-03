/* This code fetches posts from an API, displays them in the DOM, 
allows filtering based on user input, and loads more posts as the user scrolls down the page. */

// Constants
const API_URL = 'https://jsonplaceholder.typicode.com/posts';
const postsContainer = document.getElementById('posts-container');
const loading = document.querySelector('.loader');
const filter = document.getElementById('filter');

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  try {
    const res = await fetch(`${API_URL}?_limit=${limit}&_page=${page}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    // Handle the error (e.g., show an error message)
  }
}

// Create a post element
function createPostElement(post) {
  const postEl = document.createElement('div');
  postEl.classList.add('post');
  postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>
  `;
  return postEl;
}

// Show posts in the DOM
async function showPosts() {
  const posts = await getPosts();

  posts.forEach(post => {
    const postEl = createPostElement(post);
    postsContainer.appendChild(postEl);
  });
}

// Show loader & fetch more posts
function showLoading() {
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

// Filter posts by input
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll('.post');

  posts.forEach(post => {
    const title = post.querySelector('.post-title').innerText.toUpperCase();
    const body = post.querySelector('.post-body').innerText.toUpperCase();

    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = 'flex';
    } else {
      post.style.display = 'none';
    }
  });
}

// Initial display of posts on page load
showPosts();

// Add event listeners
window.addEventListener('scroll', handleScroll);
filter.addEventListener('input', handleFilter);

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollHeight - scrollTop === clientHeight) {
    showLoading();
  }
}

function handleFilter(e) {
  filterPosts(e);
}
