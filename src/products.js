
document.addEventListener('DOMContentLoaded', function() {
  // Get all filter buttons and products
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productItems = document.querySelectorAll('.product-item');
  
  // Add click event to filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all buttons
      filterBtns.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Get filter value
      const filterValue = this.getAttribute('data-filter');
      
      // Filter products
      filterProducts(filterValue);
    });
  });
  
  // Function to filter products
  function filterProducts(filter) {
    productItems.forEach(item => {
      // Get product category
      const category = item.getAttribute('data-category');
      
      // Show all products if filter is 'all'
      if (filter === 'all') {
        item.classList.remove('hide');
      } 
      // Show only products that match the filter
      else {
        if (category === filter) {
          item.classList.remove('hide');
        } else {
          item.classList.add('hide');
        }
      }
    });
  }
  
  // Buy button functionality
  const buyButtons = document.querySelectorAll('.product-item .btn');
  
  buyButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get product name and price
      const productName = this.closest('.product-details').querySelector('h3').textContent;
      const productPrice = this.closest('.product-details').querySelector('.product-price').textContent;
      
      // Show alert with order details (in a real app, this would add to cart or go to checkout)
      alert(`Added to cart: ${productName} (${productPrice})`);
    });
  });
  
  // Apply initial filtering (all products)
  filterProducts('all');
});
