// Get references to DOM elements
const search = document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const mealsEl = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const single_mealEl = document.getElementById('single-meal');

// Function to search for a meal and fetch data from API
function searchMeal(e) {
  e.preventDefault();

  // Clear the single meal display
  single_mealEl.innerHTML = '';

  // Get the search term entered by the user
  const term = search.value;

  // Check if the search term is not empty
  if (term.trim()) {
    // Fetch data from the API based on the search term DOCS: https://www.themealdb.com/api.php
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        // Display the search result heading
        resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;

        // Check if there are no search results
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no search results. Try again!<p>`;
        } else {
          // Display each meal result
          mealsEl.innerHTML = data.meals
            .map(
              meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
              <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
          `
            )
            .join('');
        }
      });
    // Clear the search input
    search.value = '';
  } else {
    // Alert the user if the search term is empty
    alert('Please enter a search term');
  }
}

// Function to fetch meal details by ID
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      // Display the meal details
      addMealToDOM(meal);
    });
}

// Function to fetch a random meal from the API
function getRandomMeal() {
  // Clear the displayed meals and heading
  mealsEl.innerHTML = '';
  resultHeading.innerHTML = '';

  // Fetch a random meal from the API
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];

      // Display the random meal details
      addMealToDOM(meal);
    });
}

// Function to add meal details to the DOM
function addMealToDOM(meal) {
  const ingredients = [];

  // Extract and format the ingredients and measurements
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  // Display the meal details
  single_mealEl.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}

// Event listeners

// Listen for form submission to initiate search
submit.addEventListener('submit', searchMeal);

// Listen for click on "Random" button to fetch a random meal
random.addEventListener('click', getRandomMeal);

// Listen for click on a meal's info to fetch and display meal details
mealsEl.addEventListener('click', e => {
  // Find the ancestor with class "meal-info"
  const mealInfo = e.composedPath().find(item => {
    if (item.classList) {
      return item.classList.contains('meal-info');
    } else {
      return false;
    }
  });

  if (mealInfo) {
    // Get the meal ID from the data attribute
    const mealID = mealInfo.getAttribute('data-mealid');
    // Fetch and display meal details by ID
    getMealById(mealID);
  }
});
