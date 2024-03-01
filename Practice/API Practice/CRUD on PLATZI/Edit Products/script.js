document.addEventListener('DOMContentLoaded', async function () {
    const editProductForm = document.getElementById('editProductForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');

    try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`);
        const product = await response.json();

        titleInput.value = product.title || '';
        descriptionInput.value = product.description || '';
        priceInput.value = product.price || '';

        editProductForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const updatedProduct = {
                title: titleInput.value,
                description: descriptionInput.value,
                price: parseFloat(priceInput.value),
            };

            try {
                const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedProduct),
                });

                if (response.ok) {
                    alert('Product updated successfully!');
                    // Redirect to view product page or perform other actions
                } else {
                    console.error('Error updating product:', response.statusText);
                }
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });

    } catch (error) {
        console.error('Error fetching product details:', error);
    }
});