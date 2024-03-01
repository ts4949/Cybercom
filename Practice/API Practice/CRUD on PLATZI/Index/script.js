document.addEventListener('DOMContentLoaded', function () {
    const addProductBtn = document.getElementById('addProductBtn');
    const viewProductsBtn = document.getElementById('viewProductsBtn');

    // Event listeners for buttons
    addProductBtn.addEventListener('click', redirectToAddProducts);
    viewProductsBtn.addEventListener('click', redirectToViewProducts);

    function redirectToAddProducts() {
        // Redirect to the "Add Products" page (you can replace with your actual URL)
        window.location.href = '../Add Products/addProducts.html';
    }

    function redirectToViewProducts() {
        // Redirect to the "View Products" page (you can replace with your actual URL)
        window.location.href = '../View Products/viewProducts.html';
    }
});
