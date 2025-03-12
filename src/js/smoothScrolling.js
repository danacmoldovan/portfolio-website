document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const menuPrev = document.querySelector('#menu-prev ul');
    const menuNext = document.querySelector('#menu-next ul');
    const menuItems = Array.from(menuNext.querySelectorAll('li'));
    const offset = 350;

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = anchor.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Offset by 100px to account for spacing
                    behavior: 'smooth',
                });
            }
        });
    });
}); 