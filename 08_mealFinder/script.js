// Get references to DOM elements
const searchInput = document.getElementById('search');
const submitButton = document.getElementById('submit');
const randomButton = document.getElementById('random');
const mealsContainer = document.getElementById('meals');
const resultHeading = document.getElementById('result-heading');
const singleMealContainer = document.getElementById('single-meal');

// Function to fetch data from the API
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

// Function to display search results
function displaySearchResults(term) {
  resultHeading.innerHTML = `<h2>Search results for '${term}':</h2>`;
}

// Function to display error message
function displayError(message) {
  resultHeading.innerHTML = `<p>${message}</p>`;
}

// Function to clear a container's content
function clearContainer(container) {
  container.innerHTML = '';
}

// Function to display a single meal's details
function displayMealDetails(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMealContainer.innerHTML = `
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
        <ul>${ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
      </div>
    </div>
  `;
}

// Function to handle form submission
async function handleSearchSubmit(e) {
  e.preventDefault();

  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    try {
      clearContainer(singleMealContainer);
      const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);

      if (data.meals === null) {
        displayError('There are no search results. Try again!');
      } else {
        displaySearchResults(searchTerm);
        mealsContainer.innerHTML = data.meals
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

      searchInput.value = '';
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  } else {
    alert('Please enter a search term');
  }
}

// Function to handle random meal button click
async function handleRandomMealClick() {
  try {
    clearContainer(mealsContainer);
    clearContainer(resultHeading);

    const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/random.php`);
    const randomMeal = data.meals[0];

    displayMealDetails(randomMeal);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to handle meal info click
async function handleMealInfoClick(e) {
  const mealInfo = e.target.closest('.meal-info');

  if (mealInfo) {
    const mealID = mealInfo.getAttribute('data-mealID');
    try {
      const data = await fetchData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
      const meal = data.meals[0];
      displayMealDetails(meal);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}

// Event listeners
submitButton.addEventListener('submit', handleSearchSubmit);
randomButton.addEventListener('click', handleRandomMealClick);
mealsContainer.addEventListener('click', handleMealInfoClick);

