import './style.css';
import typeAnimation from './typeAnimation';

function initSmoothScrolling() {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('#menu a').forEach((anchor) => {
    anchor.addEventListener('click', function clickOnMenu(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(`${targetId} h2`);

      if (targetElement) {
        const viewportHeight = window.innerHeight;
        // Calculate position to center the element in the viewport
        const elementHeight = targetElement.offsetHeight;
        // Get the element's position relative to the entire document
        const rect = targetElement.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const absoluteElementTop = rect.top + scrollTop;
        // Calculate the target scroll position to center the element
        const targetPoint = absoluteElementTop - (viewportHeight / 2) + (elementHeight / 2);
        window.scrollTo({
          top: targetPoint,
          behavior: 'smooth',
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  typeAnimation();
  initSmoothScrolling();
});
