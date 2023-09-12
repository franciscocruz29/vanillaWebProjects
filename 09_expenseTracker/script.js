/* This code primarily manages a simple expense tracker application that allows users to add and remove transactions, 
calculates the balance, income, and expenses, and stores the transactions in local storage for persistence. */

// Get DOM elements
const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// Get transactions from localStorage or set to empty array
const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  // Validate input
  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {

    // Create transaction object
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    // Add to transactions array
    transactions.push(transaction);

    // Add to DOM
    addTransactionDOM(transaction);

    // Update balance, income, expense
    updateValues();

    // Update localStorage
    updateLocalStorage();

    // Clear fields
    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {

  // Get sign 
  const sign = transaction.amount < 0 ? '-' : '+';

  // Create list item
  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  // Add HTML
  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> 
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
  `;

  // Add to DOM
  list.appendChild(item);
}

// Update balance, income, expense totals
function updateValues() {

  const amounts = transactions.map(t => t.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  // Update DOM
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);

  updateLocalStorage();

  init();
}

// Update localStorage
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Initialize app
function init() {
  // Clear list
  list.innerHTML = '';

  // Render transactions
  transactions.forEach(addTransactionDOM);

  // Update totals
  updateValues();
}

init();

// Listen for submit
form.addEventListener('submit', addTransaction);
