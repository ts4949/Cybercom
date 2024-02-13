// patientDashboard.js

// Get the username element
const username = $('#username');

// Get the logout button element
const logout = $('#logout');

// Get the appointments table element
const appointments = $('#appointments');

// Get the book button element
const book = $('#book');

// Get the current user from the session storage
const currentUser = sessionStorage.getItem('currentUser');

// Check if the current user is a patient
if (currentUser && getUser(currentUser).role === 'patient') {
  // Display the username
  username.text(currentUser);

  // Display the appointments
  displayAppointments();

  // Add a click event listener to the logout button
  logout.on('click', function () {
    // Clear the session storage
    sessionStorage.clear();

    // Redirect the user to the login page
    window.location.href = '../Login/login.html';
  });

  // Add a click event listener to the book button
  book.on('click', function () {
    // Redirect the user to the booking page
    window.location.href = '../Booking/booking.html';
  });
} else {
  // Redirect the user to the login page
  window.location.href = '../Login/login.html';
}

// A function that displays the appointments
function displayAppointments() {
  // Get the appointments data from the local storage
  const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];

  // Filter the appointments data by the current user
  const userAppointments = appointmentsData.filter(function (appointment) {
    return appointment.patient === currentUser;
  });

  // Sort the appointments data by date and time
  userAppointments.sort(function (a, b) {
    return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
  });

  // Loop through the user appointments
  userAppointments.forEach(function (appointment) {
    // Create a table row element
    const tr = $('<tr></tr>');

    // Create a table cell element for the date
    const tdDate = $('<td></td>').text(appointment.date);

    // Create a table cell element for the time
    const tdTime = $('<td></td>').text(appointment.time);

    // Create a table cell element for the doctor
    const tdDoctor = $('<td></td>').text(appointment.doctor);

    // Create a table cell element for the status
    const tdStatus = $('<td></td>').text(appointment.status);

    // Create a table cell element for the action
    const tdAction = $('<td></td>');

    // Create a button element for the cancel action
    const btnCancel = $('<button></button>').text('Cancel').addClass('btn btn-danger');

    // Add a click event listener to the cancel button
    btnCancel.on('click', function () {
      // Confirm the cancellation
      if (confirm('Are you sure you want to cancel this appointment?')) {
        // Cancel the appointment
        cancelAppointment(appointment.id);

        // Refresh the page
        window.location.reload();
      }
    });

    // Append the cancel button to the action cell
    tdAction.append(btnCancel);

    // Append the table cells to the table row
    tr.append(tdDate, tdTime, tdDoctor, tdStatus, tdAction);

    // Append the table row to the table body
    appointments.append(tr);
  });
}

// A function that cancels an appointment
function cancelAppointment(id) {
  // Get the appointments data from the local storage
  const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];

  // Find the index of the appointment with the given id
  const index = appointmentsData.findIndex(function (appointment) {
    return appointment.id === id;
  });

  // Check if the index is valid
  if (index !== -1) {
    // Remove the appointment from the array
    appointmentsData.splice(index, 1);

    // Save the updated appointments data to the local storage
    localStorage.setItem('appointments', JSON.stringify(appointmentsData));
  }
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
