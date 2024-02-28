// A function to get a random user from the randomuser.me API and add it to the table
        function getRandomUser() {
            $.ajax({
                url: "https://randomuser.me/api/",
                dataType: "json",
                success: function (data) {
                    // Get the user data from the response
                    var user = data.results[0];
                    var name = user.name.first + " " + user.name.last;
                    var email = user.email;
                    var phone = user.phone;

                    // Create a table row element with the user data
                    var tr = $("<tr>");
                    tr.append($("<td>").text(name));
                    tr.append($("<td>").text(email));
                    tr.append($("<td>").text(phone));

                    // Create a table cell element with the action buttons
                    var td = $("<td>");
                    td.append($("<button>").text("Edit").click(function () {
                        // Fill the form inputs with the user data
                        $("#id").val(user.login.uuid);
                        $("#name").val(name);
                        $("#email").val(email);
                        $("#phone").val(phone);

                        // Show the update and cancel buttons, hide the create button
                        $("#update").show();
                        $("#cancel").show();
                        $("#create").hide();

                        // Clear the message
                        $("#message").text("");
                    }));
                    td.append($("<button>").text("Delete").click(function () {
                        // Delete the user from the table
                        tr.remove();

                        // Clear the form inputs
                        $("#id").val("");
                        $("#name").val("");
                        $("#email").val("");
                        $("#phone").val("");

                        // Hide the update and cancel buttons, show the create button
                        $("#update").hide();
                        $("#cancel").hide();
                        $("#create").show();

                        // Clear the message
                        $("#message").text("");
                    }));

                    // Append the action cell to the table row
                    tr.append(td);

                    // Append the table row to the table body
                    $("#users tbody").append(tr);
                },
                error: function (xhr, status, error) {
                    // Display an error message if the request fails
                    $("#message").text("Error getting random user: " + error);
                }
            });
        }

        // A function to create a new user from the form inputs and add it to the table
        function createUser() {
            // Get the form inputs
            var name = $("#name").val();
            var email = $("#email").val();
            var phone = $("#phone").val();

            // Validate the form inputs
            if (name && email && phone) {
                // Create a table row element with the form inputs
                var tr = $("<tr>");
                tr.append($("<td>").text(name));
                tr.append($("<td>").text(email));
                tr.append($("<td>").text(phone));

                // Create a table cell element with the action buttons
                var td = $("<td>");
                td.append($("<button>").text("Edit").click(function () {
                    // Fill the form inputs with the user data
                    $("#id").val("");
                    $("#name").val(name);
                    $("#email").val(email);
                    $("#phone").val(phone);

                    // Show the update and cancel buttons, hide the create button
                    $("#update").show();
                    $("#cancel").show();
                    $("#create").hide();

                    // Clear the message
                    $("#message").text("");
                }));
                td.append($("<button>").text("Delete").click(function () {
                    // Delete the user from the table
                    tr.remove();

                    // Clear the form inputs
                    $("#id").val("");
                    $("#name").val("");
                    $("#email").val("");
                    $("#phone").val("");

                    // Hide the update and cancel buttons, show the create button
                    $("#update").hide();
                    $("#cancel").hide();
                    $("#create").show();

                    // Clear the message
                    $("#message").text("");
                }));

                // Append the action cell to the table row
                tr.append(td);

                // Append the table row to the table body
                $("#users tbody").append(tr);

                // Clear the form inputs
                $("#id").val("");
                $("#name").val("");
                $("#email").val("");
                $("#phone").val("");

                // Display a success message
                $("#message").text("User created successfully");
            } else {
                // Display an error message
                $("#message").text("Please fill all the fields");
            }
        }

        // A function to cancel the update operation and clear the form inputs
        function cancelUpdate() {
            // Clear the form inputs
            $("#id").val("");
            $("#name").val("");
            $("#email").val("");
            $("#phone").val("");

            // Hide the update and cancel buttons, show the create button
            $("#update").hide();
            $("#cancel").hide();
            $("#create").show();

            // Clear the message
            $("#message").text("");
        }

        // Call the getRandomUser function when the page loads
        $(document).ready(getRandomUser);

        // Handle the form submit event
        $("#form").submit(function (event) {
            // Prevent the default form submit action
            event.preventDefault();

            // Check which button was clicked
            if ($("#create").is(":visible")) {
                // Call the createUser function
                createUser();
            } else if ($("#update").is(":visible")) {
                // Call the updateUser function
                updateUser();
            }
        });

        // Handle the cancel button click event
        $("#cancel").click(function () {
            // Call the cancelUpdate function
            cancelUpdate();
        });