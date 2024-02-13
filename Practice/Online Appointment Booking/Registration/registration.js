// registration.js

// Get the registration form element
const registrationForm = $('#registration-form');

// Add a submit event listener to the form
registrationForm.on('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data as an object
  const formData = registrationForm.serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  // Validate the form data
  if (validateFormData(formData)) {
    // Save the user data in the local storage
    saveUser(formData);

    // Redirect the user to the login page
    window.location.href = '../Login/login.html';
  }
});

// A function that validates the form data
function validateFormData(formData) {
  // Check if the username is empty
  if (!formData.username) {
    alert('Please enter a username');
    return false;
  }

  // Check if the password is empty
  if (!formData.password) {
    alert('Please enter a password');
    return false;
  }

  // Check if the role is valid
  if (formData.role !== 'doctor' && formData.role !== 'patient') {
    alert('Please select a valid role');
    return false;
  }

  // Check if the username is already taken
  if (localStorage.getItem(formData.username)) {
    alert('This username is already taken');
    return false;
  }

  // Return true if all validations pass
  return true;
}

// A function that saves the user data in the local storage
function saveUser(formData) {
  // Convert the user data to a JSON string
  const userJSON = JSON.stringify(formData);

  // Save the user data in the local storage using the username as the key
  localStorage.setItem(formData.username, userJSON);
  
}
