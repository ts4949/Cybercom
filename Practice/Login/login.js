// login.js

// Get the login form element
const loginForm = $('#login-form');

// Add a submit event listener to the form
loginForm.on('submit', function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form data as an object
  const formData = loginForm.serializeArray().reduce(function (obj, item) {
    obj[item.name] = item.value;
    return obj;
  }, {});

  // Validate the form data
  if (validateFormData(formData)) {
    // Get the user data from the local storage
    const user = getUser(formData.username);

    // Check if the password matches
    if (user.password === formData.password) {
      // Set the current user in the session storage
      sessionStorage.setItem('currentUser', user.username);

      // Redirect the user to their respective dashboard
      if (user.role === 'doctor') {
        window.location.href = '../Doctor Dashboard/doctorDashboard.html';
      } else if (user.role === 'patient') {
          window.location.href = '../Patient Dashboard/patienDashboard.html';
      }
    } else {
      // Alert the user that the password is incorrect
      alert('Incorrect password');
    }
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

  // Check if the username exists in the local storage
  if (!localStorage.getItem(formData.username)) {
    alert('This username does not exist');
    return false;
  }

  // Return true if all validations pass
  return true;
}

// A function that gets the user data from the local storage
function getUser(username) {
  // Get the user data as a JSON string from the local storage
  const userJSON = localStorage.getItem(username);

  // Parse the user data to an object
  const user = JSON.parse(userJSON);

  // Return the user object
  return user;
}
