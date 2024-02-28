// Get the form elements
    let addForm = document.getElementById("addForm");
    let title = document.getElementById("title");
    let price = document.getElementById("price");
    let description = document.getElementById("description");
    let category = document.getElementById("category");
    let submitBtn = document.getElementById("submitBtn");
    let infoBtn = document.getElementById("infoBtn");

    // Get the page elements
    let addPage = document.getElementById("addPage");
    let infoPage = document.getElementById("infoPage");

    // Get the table elements
    let infoTable = document.getElementById("infoTable");
    let tbody = infoTable.getElementsByTagName("tbody")[0];
    let addBtn = document.getElementById("addBtn");

    // Function to add a new row to the table
    function addRow(data) {
      // Create a new row element
      let tr = document.createElement("tr");
      // Loop through the data object
      for (let key in data) {
        // Create a new cell element
        let td = document.createElement("td");
        // Set the cell text to the data value
        td.textContent = data[key];
        // Append the cell to the row
        tr.appendChild(td);
      }
      // Create the edit button
      let editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = function() {
        // Get the current row
        let currentRow = this.parentNode.parentNode;
        // Get the current data
        let currentData = {
          title: currentRow.cells[0].textContent,
          price: currentRow.cells[1].textContent,
          description: currentRow.cells[2].textContent,
          category: currentRow.cells[3].textContent
        };
        // Set the form values to the current data
        title.value = currentData.title;
        price.value = currentData.price;
        description.value = currentData.description;
        category.value = currentData.category;
        // Remove the current row from the table
        tbody.removeChild(currentRow);
        // Go to the add page
        addPage.style.display = "block";
        infoPage.style.display = "none";
        // Set the hash to "add"
        window.location.hash = "add";
      };
      // Create a new cell for the edit button
      let editTd = document.createElement("td");
      // Append the edit button to the cell
      editTd.appendChild(editBtn);
      // Append the cell to the row
      tr.appendChild(editTd);
      
      // Append the row to the table body
      tbody.appendChild(tr);
    }

    // Function to save the form data to sessionStorage
    function saveFormData() {
      // Create an object to store the data
      let data = {
        title: title.value,
        price: price.value,
        description: description.value,
        category: category.value
      };
      // Convert the object to a JSON string
      let dataString = JSON.stringify(data);
      // Save the data to sessionStorage with the key "formData"
      sessionStorage.setItem("formData", dataString);
    }

    // Function to restore the form data from sessionStorage
    function restoreFormData() {
      // Get the data from sessionStorage with the key "formData"
      let dataString = sessionStorage.getItem("formData");
      // If the data is not null, parse it to an object
      if (dataString !== null) {
        let data = JSON.parse(dataString);
        // Set the form values to the data values
        title.value = data.title;
        price.value = data.price;
        description.value = data.description;
        category.value = data.category;
      }
    }

    // Function to save the table data to sessionStorage
    function saveTableData() {
      // Create an array to store the data
      let data = [];
      // Loop through the table rows
      for (var i = 0; i < tbody.rows.length; i++) {
        // Get the current row
        let row = tbody.rows[i];
        // Create an object to store the row data
        let rowData = {
          title: row.cells[0].textContent,
          price: row.cells[1].textContent,
          description: row.cells[2].textContent,
          category: row.cells[3].textContent
        };
        // Push the object to the array
        data.push(rowData);
      }
      // Convert the array to a JSON string
      let dataString = JSON.stringify(data);
      // Save the data to sessionStorage with the key "tableData"
      sessionStorage.setItem("tableData", dataString);
    }

        // Function to restore the table data from sessionStorage
        function restoreTableData() {
      // Get the data from sessionStorage with the key "tableData"
      let dataString = sessionStorage.getItem("tableData");
      // If the data is not null, parse it to an array
      if (dataString !== null) {
        let data = JSON.parse(dataString);
        // Loop through the array
        for (let i = 0; i < data.length; i++) {
          // Get the current data object
          let rowData = data[i];
          // Add a new row to the table with the data object
          addRow(rowData);
        }
      }
    }

    // Handle the form submit event
    addForm.onsubmit = function(e) {
      // Prevent the default form submit action
      e.preventDefault();
      // Get the form data
      let data = {
        title: title.value,
        price: price.value,
        description: description.value,
        category: category.value
      };
      // Add a new row to the table with the form data
      addRow(data);
      // Reset the form fields
      addForm.reset();
      // Save the table data to sessionStorage
      saveTableData();
      // Go to the info page
      addPage.style.display = "none";
      infoPage.style.display = "block";
      // Set the hash to "info"
      window.location.hash = "info";
    };

    // Handle the info button click event
    infoBtn.onclick = function() {
      // Save the form data to sessionStorage
      saveFormData();
      // Go to the info page
      addPage.style.display = "none";
      infoPage.style.display = "block";
      // Set the hash to "info"
      window.location.hash = "info";
    };

    // Handle the add button click event
    addBtn.onclick = function() {
      // Restore the form data from sessionStorage
      restoreFormData();
      // Go to the add page
      addPage.style.display = "block";
      infoPage.style.display = "none";
      // Set the hash to "add"
      window.location.hash = "add";
    };

    // Handle the window before unload event
    window.onbeforeunload = function() {
      // Save the form data to sessionStorage
      saveFormData();
      // Save the table data to sessionStorage
      saveTableData();
    };

    // Handle the window load event
    window.onload = function() {
      // Restore the form data from sessionStorage
      restoreFormData();
      // Restore the table data from sessionStorage
      restoreTableData();
      // Set the initial hash value based on the default page
      window.location.hash = "info";
    };

    // Handle the window hash change event
    window.onhashchange = function() {
      // Get the current hash value
      let hash = window.location.hash;
      // Update the page display based on the hash value
      if (hash === "#add") {
        // Show the add page and hide the info page
        addPage.style.display = "block";
        infoPage.style.display = "none";
      } else if (hash === "#info") {
        // Show the info page and hide the add page
        infoPage.style.display = "block";
        addPage.style.display = "none";
      }
    };