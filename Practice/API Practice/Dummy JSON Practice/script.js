 document.addEventListener("DOMContentLoaded", () => {
            // Get the products from the local storage, or create an empty array if not found
            const products = localStorage.getItem("products")
                ? JSON.parse(localStorage.getItem("products"))
                : [];

            // Render the products in the HTML document
            const productList = document.getElementById("product-list");
            products.forEach((product) => {
                const card = document.createElement("div");
                card.classList.add("col-md-4", "mb-3");

                card.innerHTML = `
                    <div class="card">
                        <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">ID: ${product.id}</li>
                                <li class="list-group-item">Description: ${product.description}</li>
                                <li class="list-group-item">Price: ${product.price}</li>
                                <li class="list-group-item">Discount Percentage: ${product.discountPercentage}</li>
                                <li class="list-group-item">Rating: ${product.rating}</li>
                                <li class="list-group-item">Stock: ${product.stock}</li>
                                <li class="list-group-item">Brand: ${product.brand}</li>
                            </ul>
                        </div>
                    </div>
                `;
                productList.appendChild(card);
            });

            // Add a click handler to the select element
            $("#sort-by").on("change", function () {
                // Get the selected value
                const value = $(this).val();
                // Define a comparator function based on the value
                let comparator;
                if (value === "name-asc") {
                    comparator = (a, b) => a.title.localeCompare(b.title);
                } else if (value === "name-desc") {
                    comparator = (a, b) => b.title.localeCompare(a.title);
                } else if (value === "price-asc") {
                    comparator = (a, b) => a.price - b.price;
                } else if (value === "price-desc") {
                    comparator = (a, b) => b.price - a.price;
                }
                // Convert the list to an array of objects
                const products = $("#product-list .card").map(function () {
                    return {
                        title: $(this).find(".card-title").text(),
                        price: parseFloat(
                            $(this)
                                .find('li:contains("Price:")')
                                .text()
                                .split(":")[1]
                        ),
                        element: this,
                    };
                }).get();
                // Sort the array using the comparator function
                products.sort(comparator);
                // Detach and append the list items in the sorted order
                $("#product-list .card").detach();
                products.forEach((product) => {
                    $("#product-list").append(product.element);
                });
            });
            // Add a input handler to the input element
            $("#search-by").on("input", function () {
                // Get the input value
                const value = $(this).val().toLowerCase();
                // Loop through all list items, and hide those who don't match the search term
                $("#product-list .card").each(function () {
                    // Get the product title
                    const title = $(this).find(".card-title").text().toLowerCase();
                    // Check if the title contains the value
                    if (title.indexOf(value) > -1) {
                        // Show the card
                        $(this).show();
                    } else {
                        // Hide the card
                        $(this).hide();
                    }
                });
                // Trigger the change event on the select element to sort the filtered results
                $("#sort-by").trigger("change");
            });

            // Add a button to add a new product
            const addButton = document.createElement("button");
            addButton.classList.add("btn", "btn-primary");
            addButton.textContent = "Add a new product";
            addButton.addEventListener("click", () => {
                // Prompt the user to enter the product properties
                const id = prompt("Enter the product id:");
                const title = prompt("Enter the product title:");
                const description = prompt("Enter the product description:");
                const price = prompt("Enter the product price:");
                const discountPercentage = prompt(
                    "Enter the product discount percentage:"
                );
                const rating = prompt("Enter the product rating:");
                const stock = prompt("Enter the product stock:");
                const brand = prompt("Enter the product brand:");
                const images = prompt(
                    "Enter the product images (separated by commas):"
                );

                // Validate the input values
                if (
                    id &&
                    title &&
                    description &&
                    price &&
                    discountPercentage &&
                    rating &&
                    stock &&
                    brand &&
                    images
                ) {
                    // Create a product object with the input values
                    const product = {
                        id: id,
                        title: title,
                        description: description,
                        price: parseFloat(price),
                        discountPercentage: parseInt(discountPercentage),
                        rating: parseFloat(rating),
                        stock: parseInt(stock),
                        brand: brand,
                        images: images.split(","),
                    };

                    // Use fetch to send a POST request to the API
                    fetch("https://dummyjson.com/products/add", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(product),
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            // Check if the request was successful
                            if (data.success) {
                                // Display a confirmation message
                                alert("Product added successfully!");
                                // Add the product to the local storage array
                                products.push(product);
                                // Store the updated array in the local storage
                                localStorage.setItem(
                                    "products",
                                    JSON.stringify(products)
                                );
                                // Reload the page to show the new product
                                location.reload();
                            } else {
                                // Display an error message
                                alert("Something went wrong: " + data.error);
                            }
                        })
                        .catch((error) => {
                            // Handle any network errors
                            alert("Error sending request: " + error);
                        });
                } else {
                    // Display a warning message
                    alert(
                        "Please enter valid values for all the product properties."
                    );
                }
            });
            // Append the button to the container
            document.querySelector(".container").appendChild(addButton);

            // Add a button to edit an existing product
            const editButton = document.createElement("button");
            editButton.classList.add("btn", "btn-secondary");
            editButton.textContent = "Edit an existing product";
            editButton.addEventListener("click", () => {
                // Prompt the user to enter the product id
                const id = prompt("Enter the product id you want to edit:");
                // Find the product with the matching id in the local storage array
                const product = products.find((p) => p.id === id);
                // Check if the product exists
                if (product) {
                    // Prompt the user to enter the updated product properties
                    const title = prompt(
                        "Enter the new product title:",
                        product.title
                    );
                    const description = prompt(
                        "Enter the new product description:",
                        product.description
                    );
                    const price = prompt(
                        "Enter the new product price:",
                        product.price
                    );
                    const discountPercentage = prompt(
                        "Enter the new product discount percentage:",
                        product.discountPercentage
                    );
                    const rating = prompt(
                        "Enter the new product rating:",
                        product.rating
                    );
                    const stock = prompt(
                        "Enter the new product stock:",
                        product.stock
                    );
                    const brand = prompt(
                        "Enter the new product brand:",
                        product.brand
                    );
                    const images = prompt(
                        "Enter the new product images (separated by commas):",
                        product.images.join(",")
                    );

                    // Validate the input values
                    if (
                        title &&
                        description &&
                        price &&
                        discountPercentage &&
                        rating &&
                        stock &&
                        brand &&
                        images
                    ) {
                        // Create an updated product object with the input values
                        const updatedProduct = {
                            id: id,
                            title: title,
                            description: description,
                            price: parseFloat(price),
                            discountPercentage: parseInt(discountPercentage),
                            rating: parseFloat(rating),
                            stock: parseInt(stock),
                            brand: brand,
                            images: images.split(","),
                        };

                        // Use fetch to send a PUT request to the API
                        fetch("https://dummyjson.com/products/" + id, {
                            method: "PUT",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedProduct),
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                // Check if the request was successful
                                if (data.success) {
                                    // Display a confirmation message
                                    alert("Product updated successfully!");
                                    // Update the product in the local storage array
                                    products[products.indexOf(product)] = updatedProduct;
                                    // Store the updated array in the local storage
                                    localStorage.setItem("products", JSON.stringify(products));
                                    // Reload the page to show the updated product
                                    location.reload();
                                } else {
                                    // Display an error message
                                    alert("Something went wrong: " + data.error);
                                }
                            })
                            .catch((error) => {
                                // Handle any network errors
                                alert("Error sending request: " + error);
                            });
                    } else {
                        // Display a warning message
                        alert("Please enter valid values for all the product properties.");
                    }
                }
            });            
            // Add a button to delete an existing product
            const deleteButton = document.createElement("button");
            deleteButton.classList.add("btn", "btn-danger");
            deleteButton.textContent = "Delete an existing product";
            deleteButton.addEventListener("click", () => {
                // Prompt the user to enter the product id
                const id = prompt("Enter the product id you want to delete:");
                // Find the product with the matching id in the local storage array
                const productIndex = products.findIndex((p) => p.id === id);
                // Check if the product exists
                if (productIndex !== -1) {
                    const confirmation = confirm("Are you sure you want to delete this product?");
                    if (confirmation) {
                        // Use fetch to send a DELETE request to the API
                        fetch("https://dummyjson.com/products/1" + id, {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                // Check if the request was successful
                                if (data.success) {
                                    // Display a confirmation message
                                    alert("Product deleted successfully!");
                                    // Remove the product from the local storage array
                                    products.splice(productIndex, 1);
                                    // Store the updated array in the local storage
                                    localStorage.setItem("products", JSON.stringify(products));
                                    // Reload the page to reflect the changes
                                    location.reload();
                                } else {
                                    // Display an error message
                                    alert("Something went wrong: " + data.error);
                                }
                            })
                            .catch((error) => {
                                // Handle any network errors
                                alert("Error sending request: " + error);
                            });
                    }
                } else {
                    // Display a warning message if the product does not exist
                    alert("Product with ID " + id + " not found.");
                }
            });

            // Append the buttons to the container
            document.querySelector(".container").appendChild(addButton);
            document.querySelector(".container").appendChild(editButton);
            document.querySelector(".container").appendChild(deleteButton);
        });
        document.addEventListener("DOMContentLoaded", () => {
                fetch('https://dummyjson.com/products')
                    .then(response => response.json())
                    .then(data => {
                        const productList = document.getElementById('product-list');
                        data.products.forEach(product => {
                            const card = document.createElement('div');
                            card.classList.add('col-md-4', 'mb-3');

                            card.innerHTML = `
                            <div class="card">
                                <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                                <div class="card-body">
                                    <h5 class="card-title">${product.title}</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">ID: ${product.id}</li>
                                        <li class="list-group-item">Description: ${product.description}</li>
                                        <li class="list-group-item">Price: ${product.price}</li>
                                        <li class="list-group-item">Discount Percentage: ${product.discountPercentage}</li>
                                        <li class="list-group-item">Rating: ${product.rating}</li>
                                        <li class="list-group-item">Stock: ${product.stock}</li>
                                        <li class="list-group-item">Brand: ${product.brand}</li>
                                    </ul>
                                </div>
                            </div>
                        `;
                            productList.appendChild(card);
                        });
                        // Add a click handler to the select element
                        $('#sort-by').on('change', function () {
                            // Get the selected value
                            const value = $(this).val();
                            // Define a comparator function based on the value
                            let comparator;
                            if (value === 'name-asc') {
                                comparator = (a, b) => a.title.localeCompare(b.title);
                            } else if (value === 'name-desc') {
                                comparator = (a, b) => b.title.localeCompare(a.title);
                            } else if (value === 'price-asc') {
                                comparator = (a, b) => a.price - b.price;
                            } else if (value === 'price-desc') {
                                comparator = (a, b) => b.price - a.price;
                            }
                            // Convert the list to an array of objects
                            const products = $('#product-list .card').map(function () {
                                return {
                                    title: $(this).find('.card-title').text(),
                                    price: parseFloat($(this).find('li:contains("Price:")').text().split(':')[1]),
                                    element: this
                                };
                            }).get();
                            // Sort the array using the comparator function
                            products.sort(comparator);
                            // Detach and append the list items in the sorted order
                            $('#product-list .card').detach();
                            products.forEach(product => {
                                $('#product-list').append(product.element);
                            });
                        });
                        // Add a input handler to the input element
                        $('#search-by').on('input', function () {
                            // Get the input value
                            const value = $(this).val().toLowerCase();
                            // Loop through all list items, and hide those who don't match the search term
                            $('#product-list .card').each(function () {
                                // Get the product title
                                const title = $(this).find('.card-title').text().toLowerCase();
                                // Check if the title contains the value
                                if (title.indexOf(value) > -1) {
                                    // Show the card
                                    $(this).show();
                                } else {
                                    // Hide the card
                                    $(this).hide();
                                }
                            });
                            // Trigger the change event on the select element to sort the filtered results
                            $('#sort-by').trigger('change');
                        });
                    })
                    .catch(error => {
                        console.log('Error fetching data: ', error);
                    });
            });