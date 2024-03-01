const productList = document.getElementById('productList');
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search products';
searchInput.classList.add('mb-3');

productList.parentElement.insertBefore(searchInput, productList);

const paginationContainer = document.createElement('nav');
paginationContainer.classList.add('mt-4', 'justify-content-center');
productList.parentElement.insertBefore(paginationContainer, productList.nextSibling);

document.addEventListener('DOMContentLoaded', async function () {
  const productList = document.getElementById('productList');
  const itemsPerPage = 9; // Number of products per page

  try {
    const response = await fetch('https://api.escuelajs.co/api/v1/products');
    const products = await response.json();

    // Implement pagination logic
    let currentPage = 1;
    let filteredProducts = products; // Initially all products

    function updatePagination(filteredProducts, currentPage = 1) {
      const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

      productList.innerHTML = '';
      const start = (currentPage - 1) * itemsPerPage;
      const end = Math.min(start + itemsPerPage, filteredProducts.length);
      const paginatedProducts = filteredProducts.slice(start, end);

      paginatedProducts.forEach(product => {
        const productCard = createProductCard(product);
        productList.appendChild(productCard);
      });

      paginationContainer.innerHTML = '';
      if (totalPages > 1) {
        // Previous button
        const prevButton = document.createElement('button');
        prevButton.classList.add('btn', 'btn-outline-primary', 'mr-2');
        prevButton.disabled = currentPage === 1;
        prevButton.textContent = 'Previous';
        prevButton.addEventListener('click', () => updatePagination(filteredProducts, currentPage - 1));
        paginationContainer.appendChild(prevButton);

        // Page number buttons
        for (let i = 1; i <= totalPages; i++) {
          const pageButton = document.createElement('button');
          pageButton.classList.add('btn', 'btn-outline-primary', 'mx-1');
          pageButton.textContent = i;
          pageButton.classList.add('active', i === currentPage);
          pageButton.addEventListener('click', () => updatePagination(filteredProducts, i));
          paginationContainer.appendChild(pageButton);
        }

        // Next button
        const nextButton = document.createElement('button');
        nextButton.classList.add('btn', 'btn-outline-primary', 'ml-2');
        nextButton.disabled = currentPage === totalPages;
        nextButton.textContent = 'Next';
        nextButton.addEventListener('click', () => updatePagination(filteredProducts, currentPage + 1));
        paginationContainer.appendChild(nextButton);
      }
    }

    updatePagination(products); // Display initial page

    searchInput.addEventListener('keyup', function () {
      const searchTerm = this.value.toLowerCase().trim(); // Normalize search term
      filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
      );
      updatePagination(filteredProducts); // Update pagination with filtered products
    });

    // Sort functionality
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

    sortSelect.addEventListener('change', function () {
      const selectedOption = this.value;
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
            return 0; // No change in order
        }
      });
      updatePagination(filteredProducts); // Update pagination with sorted products
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
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: 'DELETE',
    })
        .then(response => {
          if (response.ok) {
            const productCard = document.querySelector(`[data-product-id="${productId}"]`);
            if (productCard) {
              productCard.remove();
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