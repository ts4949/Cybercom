// doctorDashboard.js

// Get the username element
const username = $('#username');

// Get the logout button element
const logout = $('#logout');

// Get the availability form element
const availabilityForm = $('#availability-form');

// Get the appointments table element
const appointments = $('#appointments');

// Get the current user from the session storage
const currentUser = sessionStorage.getItem('currentUser');

// Check if the current user is a doctor
if (currentUser && getUser(currentUser).role === 'doctor') {
  // Display the username
  username.text(currentUser);

  // Display the availability
  displayAvailability();

  // Display the appointments
  displayAppointments();

  // Add a submit event listener to the availability form
  availabilityForm.on('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data as an object
    const formData = availabilityForm.serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

    // Save the availability data in the local storage
    saveAvailability(formData);

    // Alert the user that the availability is saved
    alert('Your availability is saved');
  });

  // Add a click event listener to the logout button
  logout.on('click', function () {
    // Clear the session storage
    sessionStorage.clear();

    // Redirect the user to the login page
    window.location.href = '../Login/login.html';
  });
} else {
  // Redirect the user to the login page
  window.location.href = '../Login/login.html';
}

// A function that displays the availability
function displayAvailability() {
  // Get the availability data from the local storage
  const availabilityData = JSON.parse(localStorage.getItem('availability')) || {};

  // Get the availability data for the current user
  const userAvailability = availabilityData[currentUser] || {};

  // Loop through the weekdays
  ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].forEach(function (day) {
    // Get the input element for the day
    const input = $('#' + day);

    // Set the input value to the user availability for the day
    input.val(userAvailability[day] || '');
  });
}

// A function that displays the appointments
function displayAppointments() {
  // Get the appointments data from the local storage
  const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];

  // Filter the appointments data by the current user
  const userAppointments = appointmentsData.filter(function (appointment) {
    return appointment.doctor === currentUser;
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

    // Create a table cell element for the patient
    const tdPatient = $('<td></td>').text(appointment.patient);

    // Create a table cell element for the status
    const tdStatus = $('<td></td>').text(appointment.status);

    // Create a table cell element for the action
    const tdAction = $('<td></td>');

    // Create a button element for the accept action
    const btnAccept = $('<button></button>').text('Accept').addClass('btn btn-success');

    // Add a click event listener to the accept button
    btnAccept.on('click', function () {
      // Confirm the acceptance
      if (confirm('Are you sure you want to accept this appointment?')) {
        // Accept the appointment
        acceptAppointment(appointment.id);

        // Refresh the page
        window.location.reload();
      }
    });

    // Create a button element for the decline action
    const btnDecline = $('<button></button>').text('Decline').addClass('btn btn-danger');

    // Add a click event listener to the decline button
    btnDecline.on('click', function () {
      // Confirm the declination
      if (confirm('Are you sure you want to decline this appointment?')) {
        // Decline the appointment
        declineAppointment(appointment.id);

        // Refresh the page
        window.location.reload();
      }
    });

    // Create a button element for the reschedule action
    const btnReschedule = $('<button></button>').text('Reschedule').addClass('btn btn-warning');

    // Add a click event listener to the reschedule button
    btnReschedule.on('click', function () {
        // Prompt the user to enter a new date and time
        const newDate = prompt('Enter a new date for the appointment, e.g. 2024-02-14');
        const newTime = prompt('Enter a new time for the appointment, e.g. 10:00');
  
        // Validate the new date and time
        if (validateDate(newDate) && validateTime(newTime)) {
          // Confirm the rescheduling
          if (confirm('Are you sure you want to reschedule this appointment to ' + newDate + ' ' + newTime + '?')) {
            // Reschedule the appointment
            rescheduleAppointment(appointment.id, newDate, newTime);
  
            // Refresh the page
            window.location.reload();
          }
        } else {
          // Alert the user that the new date and time are invalid
          alert('Invalid date or time');
        }
      });
  
      // Append the buttons to the action cell
      tdAction.append(btnAccept, btnDecline, btnReschedule);
  
      // Append the table cells to the table row
      tr.append(tdDate, tdTime, tdPatient, tdStatus, tdAction);
  
      // Append the table row to the table body
      appointments.append(tr);
    });
  }
  
  // A function that accepts an appointment
  function acceptAppointment(id) {
    // Get the appointments data from the local storage
    const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];
  
    // Find the index of the appointment with the given id
    const index = appointmentsData.findIndex(function (appointment) {
      return appointment.id === id;
    });
  
    // Check if the index is valid
    if (index !== -1) {
      // Update the status of the appointment to 'accepted'
      appointmentsData[index].status = 'accepted';
  
      // Save the updated appointments data to the local storage
      localStorage.setItem('appointments', JSON.stringify(appointmentsData));
    }
  }
  
  // A function that declines an appointment
  function declineAppointment(id) {
    // Get the appointments data from the local storage
    const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];
  
    // Find the index of the appointment with the given id
    const index = appointmentsData.findIndex(function (appointment) {
      return appointment.id === id;
    });
  
    // Check if the index is valid
    if (index !== -1) {
      // Update the status of the appointment to 'declined'
      appointmentsData[index].status = 'declined';
  
      // Save the updated appointments data to the local storage
      localStorage.setItem('appointments', JSON.stringify(appointmentsData));
    }
  }
  
  // A function that reschedules an appointment
  function rescheduleAppointment(id, newDate, newTime) {
    // Get the appointments data from the local storage
    const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];
  
    // Find the index of the appointment with the given id
    const index = appointmentsData.findIndex(function (appointment) {
      return appointment.id === id;
    });
  
    // Check if the index is valid
    if (index !== -1) {
      // Update the date and time of the appointment to the new values
      appointmentsData[index].date = newDate;
      appointmentsData[index].time = newTime;
  
      // Save the updated appointments data to the local storage
      localStorage.setItem('appointments', JSON.stringify(appointmentsData));
    }
  }
  
  // A function that validates a date
  function validateDate(date) {
    // Check if the date is in the format YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(date)) return false;
  
    // Parse the date to a Date object
    const parsedDate = new Date(date);
  
    // Check if the date is valid
    if (isNaN(parsedDate)) return false;
  
    // Check if the date is in the future
    if (parsedDate < new Date()) return false;
  
    // Return true if all validations pass
    return true;
  }
  
  // A function that validates a time
  function validateTime(time) {
    // Check if the time is in the format HH:MM
    const regex = /^\d{2}:\d{2}$/;
    if (!regex.test(time)) return false;
  
    // Parse the time to a Date object
    const parsedTime = new Date('1970-01-01T' + time + ':00');
  
    // Check if the time is valid
    if (isNaN(parsedTime)) return false;
  
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
  
  // A function that saves the availability data in the local storage
  function saveAvailability(formData) {
    // Get the availability data from the local storage
    const availabilityData = JSON.parse(localStorage.getItem('availability')) || {};
  
    // Update the availability data for the current user
    availabilityData[currentUser] = formData;
  
    // Save the updated availability data to the local storage
    localStorage.setItem('availability', JSON.stringify(availabilityData));
  }
  