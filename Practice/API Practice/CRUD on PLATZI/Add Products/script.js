// custom-script.js
document.addEventListener('DOMContentLoaded', function () {
    const imageUrlInput = document.getElementById('imageUrl');
    const productImage = document.getElementById('productImage');

    imageUrlInput.addEventListener('input', displayImage);

    function displayImage() {
        const imageUrl = imageUrlInput.value;
        if (isValidImageUrl(imageUrl)) {
            productImage.src = imageUrl;
            productImage.style.display = 'block'; // Show the image
        } else {
            productImage.src = ''; // Clear the image
            productImage.style.display = 'none'; // Hide the image
        }
    }

    function isValidImageUrl(url) {
        // You can add more validation logic here if needed
        return url.startsWith('http') && /\.(jpg|jpeg|png|gif)$/i.test(url);
    }

    // Handle form submission (add product to API)
    const addProductForm = document.getElementById('addProductForm');
    addProductForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const price = parseFloat(document.getElementById('price').value);
        const description = document.getElementById('description').value;
        const categoryId = 1; // Default category ID (you can change this)

        // Create the product object
        const product = {
            categoryId,
            title,
            price,
            description,
            images: [imageUrlInput.value], // Assuming a single image URL
        };

        try {
            // Make an API call to add the product (replace with your actual API endpoint)
            const response = await fetch('https://api.escuelajs.co/api/v1/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });

            if (response.ok) {
                alert('Product added successfully!');
                // Clear form fields or redirect to another page
            } else {
                console.error('Error adding product:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product:', error);
        }
    });
});
