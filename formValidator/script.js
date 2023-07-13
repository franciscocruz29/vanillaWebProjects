// Get references to the form and input elements
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  // Get the parent element of the input
  const formControl = input.parentElement;
  // Update the CSS class to show the error style
  formControl.className = 'form-control error';
  // Get the <small> element within the form control
  const small = formControl.querySelector('small');
  // Set the error message
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  // Get the parent element of the input
  const formControl = input.parentElement;
  // Update the CSS class to show the success style
  formControl.className = 'form-control success';
}

// Check if email is valid
function checkEmail(input) {
  // Regular expression to validate email format
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    // Email is valid, show success style
    showSuccess(input);
  } else {
    // Email is not valid, show error message
    showError(input, 'Email is not valid');
  }
}

// Check required fields
function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      // Input field is empty, show error message
      showError(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      // Input field is not empty, show success style
      showSuccess(input);
    }
  });

  return isRequired;
}

// Check input length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    // Input value is too short, show error message
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    // Input value is too long, show error message
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    // Input value is within the allowed length, show success style
    showSuccess(input);
  }
}

// Check if passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    // Passwords do not match, show error message
    showError(input2, 'Passwords do not match');
  }
}

// Get field name
function getFieldName(input) {
  // Get the ID of the input and capitalize the first letter
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listener for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Check if required fields are filled
  if (checkRequired([username, email, password, password2])) {
    // Check the length of username and password fields
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);

    // Check if email is valid
    checkEmail(email);

    // Check if passwords match
    checkPasswordsMatch(password, password2);
  }
});

