document.addEventListener('DOMContentLoaded', function() {
  // Initial reveal of elements that are already in viewport on page load
  setTimeout(() => {
    revealElementsInViewport();
  }, 100);
  
  // Add scroll event listener
  window.addEventListener('scroll', function() {
    revealElementsInViewport();
  });
  
  function revealElementsInViewport() {
    const elements = document.querySelectorAll('.reveal, .slide-left, .slide-right');
    
    // Helper function to check if element is in viewport
    function isInViewport(element) {
      const rect = element.getBoundingClientRect();
      const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
      // Element is considered in viewport when its top part is 20% into the viewport
      return (rect.top <= windowHeight * 0.8);
    }
    
    // Reveal elements
    elements.forEach(element => {
      if (isInViewport(element)) {
        element.classList.add('active');
      }
    });
  }
});