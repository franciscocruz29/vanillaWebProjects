// Get references to the HTML elements
const fromCurrencySelect = document.getElementById('currency-one');
const fromAmountInput = document.getElementById('amount-one');
const toCurrencySelect = document.getElementById('currency-two');
const toAmountInput = document.getElementById('amount-two');
const exchangeRateDisplay = document.getElementById('rate');
const swapButton = document.getElementById('swap');

// Function to fetch exchange rate data and update the conversion
function updateConversion() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  // Fetch exchange rate data from an API
  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
      // Calculate the exchange rate between the two currencies
      const exchangeRate = data.rates[toCurrency] / data.rates[fromCurrency];

      // Update the exchange rate display
      exchangeRateDisplay.innerText = `1 ${fromCurrency} = ${exchangeRate} ${toCurrency}`;

      // Calculate the converted amount and display it in the "to" amount input
      toAmountInput.value = (fromAmountInput.value * exchangeRate).toFixed(2);
    });
}

// Event Listeners:

// When the user changes the selected currency for the "from" input or enters a new amount,
// call the updateConversion function to update the conversion
fromCurrencySelect.addEventListener('change', updateConversion);
fromAmountInput.addEventListener('input', updateConversion);

// When the user changes the selected currency for the "to" input or enters a new amount,
// call the updateConversion function to update the conversion
toCurrencySelect.addEventListener('change', updateConversion);
toAmountInput.addEventListener('input', updateConversion);

// When the user clicks the swap button, exchange the selected currencies
// and then call the updateConversion function to update the conversion
swapButton.addEventListener('click', () => {
  const temp = fromCurrencySelect.value;
  fromCurrencySelect.value = toCurrencySelect.value;
  toCurrencySelect.value = temp;
  updateConversion();
});

// Call the updateConversion function initially to set the initial values
updateConversion();
