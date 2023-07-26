// Get references to the HTML elements for currency and amount inputs, rate display, and swap button
const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

// Function to calculate and display the exchange rate and converted amount
function calculate() {
  // Get the selected currencies from the dropdowns
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  // Fetch exchange rate data from an API
  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // Calculate the exchange rate between the two currencies
      const rate = data.rates[currency_two] / data.rates[currency_one];

      // Update the rate display element with the calculated rate
      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      // Calculate the converted amount and display it in the second amount input
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

// Event Listeners:

// When the user changes the selected currency for the first input or enters a new amount,
// call the calculate function to update the rate and converted amount
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);

// When the user changes the selected currency for the second input or enters a new amount,
// call the calculate function to update the rate and converted amount
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

// When the user clicks the swap button, exchange the selected currencies
// and then call the calculate function to update the rate and converted amount
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
});

// Call the calculate function initially to set the initial values
calculate();
