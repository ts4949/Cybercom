//JS for Online Appointment Booking

// Global variables
let currentUser = null; // The current logged in user
let users = []; // The array of registered users
let appointments = []; // The array of booked appointments
let availabilities = []; // The array of available time slots for doctors

// Get the elements from the document
const loginForm = document.getElementById("login-form");
const dashboard = document.getElementById("dashboard");
const appointmentTable = document.getElementById("appointment-table");
const availabilityForm = document.getElementById("availability-form");
const bookingForm = document.getElementById("booking-form");
const successAlert = document.getElementById("success-alert");
const errorAlert = document.getElementById("error-alert");
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");
const welcomeMessage = document.getElementById("welcome-message");
const appointmentTitle = document.getElementById("appointment-title");
const appointmentBody = document.getElementById("appointment-body");
const loginButton = document.getElementById("login-button");
const registerButton = document.getElementById("register-button");
const logoutButton = document.getElementById("logout-button");
const setButton = document.getElementById("set-button");
const bookButton = document.getElementById("book-button");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const roleInput = document.getElementById("role");
const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");
const doctorInput = document.getElementById("doctor");
const dateInput1 = document.getElementById("date1");
const timeInput1 = document.getElementById("time1");

// Load the data from the local storage
function loadData() {
    // Get the users from the local storage
    const usersString = localStorage.getItem("users");
    if (usersString) {
        users = JSON.parse(usersString);
    }

    // Get the appointments from the local storage
    const appointmentsString = localStorage.getItem("appointments");
    if (appointmentsString) {
        appointments = JSON.parse(appointmentsString);
    }

    // Get the availabilities from the local storage
    const availabilitiesString = localStorage.getItem("availabilities");
    if (availabilitiesString) {
        availabilities = JSON.parse(availabilitiesString);
    }
}

// Save the data to the local storage
function saveData() {
    // Save the users to the local storage
    const usersString = JSON.stringify(users);
    localStorage.setItem("users", usersString);

    // Save the appointments to the local storage
    const appointmentsString = JSON.stringify(appointments);
    localStorage.setItem("appointments", appointmentsString);

    // Save the availabilities to the local storage
    const availabilitiesString = JSON.stringify(availabilities);
    localStorage.setItem("availabilities", availabilitiesString);
    availabilities=JSON.parse(availabilitiesString)
}


// Show the success message
function showSuccess(message) {
    successMessage.textContent = message;
    successAlert.style.display = "block";
    errorAlert.style.display = "none";
}

// Show the error message
function showError(message) {
    errorMessage.textContent = message;
    errorAlert.style.display = "block";
    successAlert.style.display = "none";
}

// Clear the input fields
function clearInputs() {
    usernameInput.value = "";
    passwordInput.value = "";
    roleInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
    doctorInput.value = "";
    dateInput1.value = "";
    timeInput1.value = "";
}

// Toggle the visibility of the elements
function toggleElements() {
    if (currentUser) {
        // Show the dashboard and hide the login form
        dashboard.style.display = "block";
        loginForm.style.display = "none";
        // Show the welcome message with the username and role
        welcomeMessage.textContent = `Welcome, ${currentUser.username} (${currentUser.role})`;
        // Show the appropriate elements based on the role
        if (currentUser.role === "doctor") {
            // Show the appointment table and the availability form
            appointmentTable.style.display = "block";
            availabilityForm.style.display = "block";
            // Hide the booking form
            bookingForm.style.display = "none";
            // Set the appointment title to "Your appointments"
            appointmentTitle.textContent = "Your appointments";
        } else if (currentUser.role === "patient") {
            // Show the appointment table and the booking form
            appointmentTable.style.display = "block";
            bookingForm.style.display = "block";
            // Hide the availability form
            availabilityForm.style.display = "none";
            // Set the appointment title to "Your upcoming appointments"
            appointmentTitle.textContent = "Your upcoming appointments";
            // Populate the doctor select options
            populateDoctorOptions();
        }
    } else {
        // Show the login form and hide the dashboard
        loginForm.style.display = "block";
        dashboard.style.display = "none";
        // Hide the appointment table, the availability form, and the booking form
        appointmentTable.style.display = "none";
        availabilityForm.style.display = "none";
        bookingForm.style.display = "none";
    }
}

// Populate the doctor select options
function populateDoctorOptions() {
    // Clear the existing options
    doctorInput.innerHTML = "";
    // Create a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select doctor";
    // Append the default option to the select element
    doctorInput.appendChild(defaultOption);
    // Check if the users array is empty
    if (users.length === 0) {
    // Show the error message
    showError("No users found");
    return;
    }
    // Loop through the users array and find the doctors
    let doctorCount = 0; // A variable to count the number of doctors
    for (const user of users) {
        if (user.role === "doctor") {
            // Create an option element for each doctor
            const option = document.createElement("option");
            option.value = user.username;
            option.textContent = user.username;
            // Append the option element to the select element
            doctorInput.appendChild(option);
            // Increment the doctor count
            doctorCount++;
        }
    }
    // Check if the doctor count is zero
    if (doctorCount === 0) {
        // Show the error message
        showError("No doctors found");
        return;
    }
}

// Populate the appointment table
function populateAppointmentTable() {
    // Clear the existing rows
    appointmentBody.innerHTML = "";
    // Loop through the appointments array and find the relevant ones
    for (const appointment of appointments) {
        if (currentUser.role === "doctor" && appointment.doctor === currentUser.username) {
            // Create a row element for each appointment
            const row = document.createElement("tr");
            // Create a cell element for each property
            const dateCell = document.createElement("td");
            const timeCell = document.createElement("td");
            const doctorCell = document.createElement("td");
            const patientCell = document.createElement("td");
            const statusCell = document.createElement("td");
            const actionCell = document.createElement("td");
            // Set the text content of each cell
            dateCell.textContent = appointment.date;
            timeCell.textContent = appointment.time;
            doctorCell.textContent = appointment.doctor;
            patientCell.textContent = appointment.patient;
            statusCell.textContent = appointment.status;
            // Create a button element for the action
            const actionButton = document.createElement("button");
            actionButton.className = "btn btn-sm";
            // Set the text content and the click handler of the button based on the status
            if (appointment.status === "Pending") {
                actionButton.textContent = "Accept";
                actionButton.className += " btn-success";
                actionButton.onclick = function() {
                    // Change the status to "Accepted"
                    appointment.status = "Accepted";
                    // Save the data
                    saveData();
                    // Show the success message
                    showSuccess("You have accepted the appointment");
                    // Repopulate the table
                    populateAppointmentTable();
                };
            } else if (appointment.status === "Accepted") {
                actionButton.textContent = "Decline";
                actionButton.className += " btn-danger";
                actionButton.onclick = function() {
                    // Change the status to "Declined"
                    appointment.status = "Declined";
                    // Save the data
                    saveData();
                    // Show the success message
                    showSuccess("You have declined the appointment");
                    // Repopulate the table
                    populateAppointmentTable();
                };
            } else {
                actionButton.textContent = "No action";
                actionButton.className += " btn-secondary";
                actionButton.disabled = true;
            }
            // Append the button to the action cell
            actionCell.appendChild(actionButton);
            // Append the cells to the row
            row.appendChild(dateCell);
            row.appendChild(timeCell);
            row.appendChild(doctorCell);
            row.appendChild(patientCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);
            // Append the row to the table body
            appointmentBody.appendChild(row);
        } else if (currentUser.role === "patient" && appointment.patient === currentUser.username) {
            // Create a row element for each appointment
            const row = document.createElement("tr");
            // Create a cell element for each property
            const dateCell = document.createElement("td");
            const timeCell = document.createElement("td");
            const doctorCell = document.createElement("td");
            const patientCell = document.createElement("td");
            const statusCell = document.createElement("td");
            const actionCell = document.createElement("td");
            // Set the text content of each cell
            dateCell.textContent = appointment.date;
            timeCell.textContent = appointment.time;
            doctorCell.textContent = appointment.doctor;
            patientCell.textContent = appointment.patient;
            statusCell.textContent = appointment.status;
            // Create a button element for the action
            const actionButton = document.createElement("button");
            actionButton.className = "btn btn-sm";
            // Set the text content and the click handler of the button based on the status
            if (appointment.status === "Pending" || appointment.status === "Accepted") {
                actionButton.textContent = "Cancel";
                actionButton.className += " btn-danger";
                actionButton.onclick = function() {
                    // Change the status to "Cancelled"
                    appointment.status = "Cancelled";
                    // Save the data
                    saveData();
                    // Show the success message
                    showSuccess("You have cancelled the appointment");
                    // Repopulate the table
                    populateAppointmentTable();
                };
            } else {
                actionButton.textContent = "No action";
                actionButton.className += " btn-secondary";
                actionButton.disabled = true;
            }
            // Append the button to the action cell
            actionCell.appendChild(actionButton);
            // Append the cells to the row
            row.appendChild(dateCell);
            row.appendChild(timeCell);
            row.appendChild(doctorCell);
            row.appendChild(patientCell);
            row.appendChild(statusCell);
            row.appendChild(actionCell);
            // Append the row to the table body
            appointmentBody.appendChild(row);
        }
    }
}

// Handle the login button click
loginButton.onclick = function(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Get the input values
    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;
    // Validate the input values
    if (username && password && role) {
        // Find the user with the same username and role
        const user = users.find(user => user.username === username && user.role === role);
        if (user) {
            // Check the password
            if (user.password === password) {
                // Set the current user
                currentUser = user;
                // Save the data
                saveData();
                // Show the success message
                showSuccess("You have logged in successfully");
                // Clear the input fields
                clearInputs();
                // Toggle the elements
                toggleElements();
                // Populate the appointment table
                populateAppointmentTable();
            } else {
                // Show the error message
                showError("Incorrect password");
            }
        } else {
            // Show the error message
            showError("User not found");
        }
    } else {
        // Show the error message
        showError("Please fill in all the fields");
    }
};

// Handle the register button click
registerButton.onclick = function() {
    // Get the input values
    const username = usernameInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;

    // Validate the input values
    if (username && password && role) {
        // Check if the username and role are already taken
        const user = users.find(user => user.username === username && user.role === role);

        if (user) {
            // Show the error message
            showError("Username and role already taken");
        } else {
            // Create a new user object
            const newUser = {
            username: username,
            password: password,
            role: role
            };
    
            // Add the new user to the users array
            users.push(newUser);
    
            // Set the current user
            currentUser = newUser;
    
            // Save the data
            saveData();
    
            // Show the success message
            showSuccess("You have registered successfully");
    
            // Clear the input fields
            clearInputs();
    
            // Toggle the elements
            toggleElements();
    
            // Populate the appointment table
            populateAppointmentTable(); 
        }
    } else {
        // Show the error message
        showError("Please fill in all the fields");
    }
};


// Handle the logout button click
logoutButton.onclick = function() {
    // Clear the current user
    currentUser = null;
    // Save the data
    saveData();
    // Show the success message
    showSuccess("You have logged out successfully");
    // Toggle the elements
    toggleElements();
};

// Handle the set button click
setButton.onclick = function(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Get the input values
    const date = dateInput.value;
    const time = timeInput.value;
    // Validate the input values
    if (date && time) {
        // Check if the date and time are already taken
        const availability = availabilities.find(availability => availability.date === date && availability.time === time && availability.doctor === currentUser.username);
        if (availability) {
            // Show the error message
            showError("You have already set your availability for this date and time");
        } else {
            // Create a new availability object
            const newAvailability = {
                date: date,
                time: time,
                doctor: currentUser.username
            };
            // Add the new availability to the availabilities array
            availabilities.push(newAvailability);
            // Save the data
            saveData();
            // Show the success message
            showSuccess("You have set your availability successfully");
            // Clear the input fields
            clearInputs();
        }
    } else {
        // Show the error message
        showError("Please fill in all the fields");
    }
};

// Handle the book button click
bookButton.onclick = function(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Get the input values
    // Change the way to get the value of the doctor select element
    const doctor = doctorInput.options[doctorInput.selectedIndex].value;
    const date = dateInput1.value;
    const time = timeInput1.value;
    // Validate the input values
    if (doctor && date && time) {
        // Check if the doctor is available for the date and time
        const availability = availabilities.find((availability) => {
            if (availability.date === date && availability.time === time && availability.doctor === doctor) {
                return availability;
            }
        });
        console.log(availabilities);
        console.log(date);
        console.log(time);
        console.log(doctor);


        if (availability) {
            // Check if the appointment is already booked
            const appointment = appointments.find(appointment => appointment.date === date && appointment.time === time && appointment.doctor === doctor);
            if (appointment) {
                // Show the error message
                showError("The appointment is already booked by another patient");
            } else {
                // Create a new appointment object
                const newAppointment = {
                    date: date,
                    time: time,
                    doctor: doctor,
                    patient: currentUser.username,
                    status: "Pending"
                };
                // Add the new appointment to the appointments array
                appointments.push(newAppointment);
                // Save the data
                saveData();
                // Show the success message
                showSuccess("You have booked an appointment successfully");
                // Clear the input fields
                clearInputs();
                // Repopulate the table
                populateAppointmentTable();
            }
        } else {
            // Show the error message
            showError("The doctor is not available for this date and time");
        }
    } else {
        // Show the error message
        showError("Please fill in all the fields");
    }
};



// Load the data and toggle the elements when the page loads
window.onload = function() {
    loadData();
    toggleElements();
};
