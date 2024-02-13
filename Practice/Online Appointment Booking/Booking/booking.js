// booking.js

// Get the username element
const username = $('#username');

// Get the logout button element
const logout = $('#logout');

// Get the booking form element
const bookingForm = $('#booking-form');

// Get the doctor select element
const doctorSelect = $('#doctor');

// Get the date input element
const dateInput = $('#date');

// Get the time select element
const timeSelect = $('#time');

// Get the current user from the session storage
const currentUser = sessionStorage.getItem('currentUser');

// Check if the current user is a patient
if (currentUser && getUser(currentUser).role === 'patient') {
  // Display the username
  username.text(currentUser);

  // Display the doctors
  displayDoctors();

  // Add a change event listener to the doctor select
  doctorSelect.on('change', function () {
    // Clear the time select options
    timeSelect.empty();

    // Get the selected doctor
    const selectedDoctor = doctorSelect.val();

    // Display the available time slots for the selected doctor
    displayTimeSlots(selectedDoctor);
  });

  // Add a change event listener to the date input
  dateInput.on('change', function () {
    // Clear the time select options
    timeSelect.empty();

    // Get the selected doctor
    const selectedDoctor = doctorSelect.val();

    // Display the available time slots for the selected doctor
    displayTimeSlots(selectedDoctor);
  });

  // Add a submit event listener to the booking form
  bookingForm.on('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the form data as an object
    const formData = bookingForm.serializeArray().reduce(function (obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});

    // Validate the form data
    if (validateBooking(formData)) {
      // Book the appointment
      bookAppointment(formData);

      // Alert the user that the appointment is booked
      alert('Your appointment is booked');

      // Redirect the user to the patient dashboard
      window.location.href = '../Patient Dashboard/patientDashboard.html';
    } else {
      // Alert the user that the form data is invalid
      alert('Invalid booking data');
    }
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

// A function that displays the doctors
function displayDoctors() {
  // Get the user data from the local storage
  const userData = JSON.parse(localStorage.getItem('users')) || [];

  // Filter the user data by the role of doctor
  const doctors = userData.filter(function (user) {
    return user.role === 'doctor';
  });

  // Loop through the doctors
  doctors.forEach(function (doctor) {
    // Create an option element for the doctor
    const option = $('<option></option>').text(doctor.username).val(doctor.username);

    // Append the option element to the doctor select
    doctorSelect.append(option);
  });
}

// A function that displays the available time slots for the selected doctor
function displayTimeSlots(doctor) {
  // Get the availability data from the local storage
  const availabilityData = JSON.parse(localStorage.getItem('availability')) || {};

  // Get the availability data for the selected doctor
  const doctorAvailability = availabilityData[doctor] || {};

  // Get the selected date
  const selectedDate = dateInput.val();

  // Check if the selected date is valid
  if (validateDate(selectedDate)) {
    // Get the weekday of the selected date
    const weekday = new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

    // Get the time slots for the weekday
    const timeSlots = doctorAvailability[weekday] || '';

    // Split the time slots by commas
    const timeSlotsArray = timeSlots.split(',');

    // Loop through the time slots array
    timeSlotsArray.forEach(function (timeSlot) {
      // Trim the whitespace from the time slot
      timeSlot = timeSlot.trim();

      // Check if the time slot is valid
      if (validateTimeSlot(timeSlot)) {
        // Create an option element for the time slot
        const option = $('<option></option>').text(timeSlot).val(timeSlot);

        // Append the option element to the time select
        timeSelect.append(option);
      }
    });
  }
}

// A function that validates the booking data
function validateBooking(data) {
  // Check if the data is not empty
  if (data && data.doctor && data.date && data.time) {
    // Check if the data is valid
    if (validateDoctor(data.doctor) && validateDate(data.date) && validateTimeSlot(data.time)) {
      // Check if the time slot is available
      if (isTimeSlotAvailable(data.doctor, data.date, data.time)) {
        // Return true if all validations pass
        return true;
      }
    }
  }

  // Return false if any validation fails
  return false;
}

// A function that books an appointment
function bookAppointment(data) {
  // Get the appointments data from the local storage
  const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];

  // Create a new appointment object
  const newAppointment = {
    id: generateId(),
    doctor: data.doctor,
    patient: currentUser,
    date: data.date,
    time: data.time,
    status: 'pending',
  };

  // Push the new appointment to the appointments data array
  appointmentsData.push(newAppointment);

  // Save the updated appointments data to the local storage
  localStorage.setItem('appointments', JSON.stringify(appointmentsData));
}

// A function that validates a doctor
function validateDoctor(doctor) {
  // Get the user data from the local storage
  const userData = JSON.parse(localStorage.getItem('users')) || [];

  // Find the user with the given username
  const user = userData.find(function (user) {
    return user.username === doctor;
  });

  // Check if the user exists and has the role of doctor
  if (user && user.role === 'doctor') {
    // Return true if the user is valid
    return true;
  }

  // Return false if the user is invalid
  return false;
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
  
  // A function that validates a time slot
  function validateTimeSlot(timeSlot) {
    // Check if the time slot is in the format HH:MM-HH:MM
    const regex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;
    if (!regex.test(timeSlot)) return false;
  
    // Split the time slot by the dash
    const [startTime, endTime] = timeSlot.split('-');
  
    // Parse the start and end time to Date objects
    const parsedStartTime = new Date('1970-01-01T' + startTime + ':00');
    const parsedEndTime = new Date('1970-01-01T' + endTime + ':00');
  
    // Check if the start and end time are valid
    if (isNaN(parsedStartTime) || isNaN(parsedEndTime)) return false;
  
    // Check if the start time is before the end time
    if (parsedStartTime >= parsedEndTime) return false;
  
    // Return true if all validations pass
    return true;
  }
  
  // A function that checks if a time slot is available
  function isTimeSlotAvailable(doctor, date, timeSlot) {
    // Get the appointments data from the local storage
    const appointmentsData = JSON.parse(localStorage.getItem('appointments')) || [];
  
    // Find the appointment with the same doctor, date, and time slot
    const appointment = appointmentsData.find(function (appointment) {
      return (
        appointment.doctor === doctor &&
        appointment.date === date &&
        appointment.time === timeSlot
      );
    });
  
    // Check if the appointment exists and has the status of 'pending' or 'accepted'
    if (appointment && (appointment.status === 'pending' || appointment.status === 'accepted')) {
      // Return false if the time slot is not available
      return false;
    }
  
    // Return true if the time slot is available
    return true;
  }
  
  // A function that generates a random id
  function generateId() {
    // Create a random string of 8 characters
    const id = Math.random().toString(36).substr(2, 8);
  
    // Return the id
    return id;
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
  