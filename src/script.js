
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Elements
  const header = document.querySelector('.header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  const navLinks = document.querySelectorAll('.nav-link');
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const newsletterForm = document.querySelector('.newsletter-form');
  
  let currentSlide = 0;
  let slideInterval;

  // Toggle mobile menu
  menuToggle.addEventListener('click', function() {
    navList.classList.toggle('active');
    
    // Animate hamburger menu
    const spans = this.querySelectorAll('span');
    if (navList.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  // Close mobile menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('active');
      
      // Reset hamburger menu
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
  
  // Slider functionality
  function goToSlide(index) {
    // Hide all slides
    slides.forEach(slide => {
      slide.classList.remove('active');
    });
    
    // Remove active class from all dots
    dots.forEach(dot => {
      dot.classList.remove('active');
    });
    
    // Show the current slide and activate its dot
    slides[index].classList.add('active');
    dots[index].classList.add('active');
    
    // Update current slide index
    currentSlide = index;
  }
  
  // Next slide function
  function nextSlide() {
    let nextIndex = currentSlide + 1;
    if (nextIndex >= slides.length) {
      nextIndex = 0;
    }
    goToSlide(nextIndex);
  }
  
  // Previous slide function
  function prevSlide() {
    let prevIndex = currentSlide - 1;
    if (prevIndex < 0) {
      prevIndex = slides.length - 1;
    }
    goToSlide(prevIndex);
  }
  
  // Start automatic slider
  function startSlideInterval() {
    // Change slides every 5 seconds
    slideInterval = setInterval(nextSlide, 5000);
  }
  
  // Stop automatic slider (when user interacts)
  function stopSlideInterval() {
    clearInterval(slideInterval);
  }
  
  // Add click event to dots
  dots.forEach(dot => {
    dot.addEventListener('click', function() {
      goToSlide(parseInt(this.getAttribute('data-index')));
      stopSlideInterval(); // Stop auto sliding when user interacts
      startSlideInterval(); // Restart auto sliding
    });
  });
  
  // Add click events to prev/next buttons
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      prevSlide();
      stopSlideInterval();
      startSlideInterval();
    });
    
    nextBtn.addEventListener('click', function() {
      nextSlide();
      stopSlideInterval();
      startSlideInterval();
    });
  }
  
  // Add scroll event to change header style
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.padding = '15px 0';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.padding = '20px 0';
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
  });
  
  // Handle newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      // Get email input
      const email = this.querySelector('input').value;
      
      // Simple validation (could be enhanced)
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // In a real application, you would send this to a server
      console.log('Newsletter signup:', email);
      
      // Show success message
      alert('Thank you for subscribing to our newsletter!');
      
      // Reset form
      this.reset();
    });
  }
  
  // Product card hover effect
  const productCards = document.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
  // Initialize: Start slider
  goToSlide(0); // Show first slide
  startSlideInterval();
});
