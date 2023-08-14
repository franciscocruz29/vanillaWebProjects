// Selecting elements from the DOM
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Initialize the ticket price based on the selected movie
let ticketPrice = +movieSelect.value;

// Save selected movie index and price to local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update the count and total of selected seats
function updateSelectedCount() {
  // Get all selected seats
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // Map the index of each selected seat
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  // Store the selected seats' indexes in local storage as a JSON string
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  // Update the count of selected seats
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;

  // Update the total price based on the count and ticket price
  total.innerText = selectedSeatsCount * ticketPrice;

  // Save the selected movie index and price to local storage
  setMovieData(movieSelect.selectedIndex, movieSelect.value);
}

// Populate UI with data from local storage
function populateUI() {
  // Retrieve selected seats from local storage
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  // If there are selected seats in local storage, mark them as selected
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.includes(index)) {
        seat.classList.add('selected');
      }
    });
  }

  // Retrieve selected movie index from local storage and set the dropdown value
  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Event listener for movie select dropdown
movieSelect.addEventListener('change', e => {
  // Update the ticket price and save selected movie data
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);

  // Update the count and total
  updateSelectedCount();
});

// Event listener for seat clicks within the container
container.addEventListener('click', e => {
  // Check if the clicked element is an unoccupied seat
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    // Toggle the 'selected' class of the clicked seat
    e.target.classList.toggle('selected');

    // Update the count and total
    updateSelectedCount();
  }
});

// Initialize the count and total
updateSelectedCount();

// Populate UI on initial page load
populateUI();
