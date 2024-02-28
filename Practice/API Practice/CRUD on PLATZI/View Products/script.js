const productList = document.getElementById('productList');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search products';
searchInput.classList.add('mb-3');

productList.parentElement.insertBefore(searchInput, productList);

document.addEventListener('DOMContentLoaded', async function () {
  const productList = document.getElementById('productList');

  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const products = await response.json();

    // Sort options dropdown
    const sortSelect = document.createElement('select');
    sortSelect.classList.add('mb-3');
    productList.parentElement.insertBefore(sortSelect, productList);

    const options = [
      { value: 'default', text: 'Default' },
      { value: 'name-asc', text: 'Name (Ascending)' },
      { value: 'name-desc', text: 'Name (Descending)' },
      { value: 'price-asc', text: 'Price (Ascending)' },
      { value: 'price-desc', text: 'Price (Descending)' },
    ];

    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.text = option.text;
      sortSelect.appendChild(optionElement);
    });

    searchInput.addEventListener('keyup', function () {
      const searchTerm = this.value.toLowerCase().trim(); // Normalize search term
      let filteredProducts = [...products]; // Copy the original array

      if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
          product.title.toLowerCase().includes(searchTerm)
        );
      }

      // Apply additional sorting if selected
      const selectedOption = sortSelect.value;
      if (selectedOption !== 'default') {
        filteredProducts.sort((a, b) => {
          switch (selectedOption) {
            case 'name-asc':
              return a.title.localeCompare(b.title);
            case 'name-desc':
              return b.title.localeCompare(a.title);
            case 'price-asc':
              return a.price - b.price;
            case 'price-desc':
              return b.price - a.price;
            default:
              break;
          }
        });
      }

      productList.innerHTML = ''; // Clear existing product cards
      filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
      });
    });

    // Render products initially
    products.forEach(product => {
      const productCard = createProductCard(product);
      productList.appendChild(productCard);
    });
  } catch (error) {
    console.error('Error fetching products:', error);
  }
});



    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-4');
        card.setAttribute('data-product-id', product.id); // Add data attribute for product ID

        card.innerHTML = `
            <div class="card">
                <img src="${product.images[0]}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Price: $${product.price}</p>
                    <button class="btn btn-primary mr-2" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn btn-danger" onclick="confirmDelete(${product.id})">Delete</button>
                </div>
            </div>
        `;

        return card;
    }

    function editProduct(productId) {
    window.location.href = `../Edit Products/editProducts.html?productId=${productId}`;
}

    function confirmDelete(productId) {
        const result = confirm('Are you sure you want to delete this product?');
        if (result) {
            // Call the API to delete the product (replace with your actual API endpoint)
            fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
                method: 'DELETE',
                // Add any necessary headers here
            })
                .then(response => {
                    if (response.ok) {
                        // Product deleted successfully
                        const productCard = document.querySelector(`[data-product-id="${productId}"]`);
                        if (productCard) {
                            productCard.remove(); // Remove the card from view
                            alert('Product deleted successfully.');
                        }
                    } else {
                        console.error('Error deleting product:', response.statusText);
                    }
                })
                .catch(error => {
                    console.error('Error deleting product:', error);
                });
        }
    }
