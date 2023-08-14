// Get references to the DOM elements we'll be using
const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

// Initialize an empty array to store user data
let data = [];

// Fetch and add three random users with random money amounts
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
  // Fetch data from a random user API
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();

  // Extract necessary user details from the API response
  const user = data.results[0];

  // Create a new user object with a random money amount
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  // Add the new user object to the data array
  addData(newUser);
}

// Double everyone's money in the data array
function doubleMoney() {
  // Use the map() function to create a new array with updated money values
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  // Update the DOM to reflect the new data
  updateDOM();
}

// Sort users by their wealth in descending order
function sortByRichest() {
  // Use the sort() function with a custom compare function to sort users by money
  data.sort((a, b) => b.money - a.money);

  // Update the DOM to reflect the new data order
  updateDOM();
}

// Filter and show only millionaires
function showMillionaires() {
  // Use the filter() function to create a new array with only millionaire users
  data = data.filter(user => user.money > 1000000);

  // Update the DOM to show only the millionaire users
  updateDOM();
}

// Calculate the total wealth of all users
function calculateWealth() {
  // Use the reduce() function to sum up the money of all users
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  // Create a new element to display the total wealth
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}

// Add a new object to the data array
function addData(obj) {
  data.push(obj);

  // Update the DOM to reflect the new data
  updateDOM();
}

// Update the DOM with the data provided (default to the current data array)
function updateDOM(providedData = data) {
  // Clear the main div to prepare for re-rendering
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

  // Iterate through the provided data and create elements to display user information
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format a number as money (e.g., 1000 -> $1,000.00)
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Add event listeners to the buttons, linking them to their respective functions
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', calculateWealth);
