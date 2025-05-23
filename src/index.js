import './style.css';
import typeAnimation from './typeAnimation';

const sections = [];
const sectionActivePositions = [];

function getActivePositionForSection(targetElement) {
  const viewportHeight = window.innerHeight;
  // Calculate position to center the element in the viewport
  const elementHeight = targetElement.offsetHeight;
  // Get the element's position relative to the entire document
  const rect = targetElement.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const absoluteElementTop = rect.top + scrollTop;
  // Calculate the active position to center the element
  return absoluteElementTop - (viewportHeight / 2) + (elementHeight / 2) + 200;
}

function parseSections() {
  const sectionsElements = document.querySelectorAll('section');
  const parsedSections = [];

  // Process each section and add to array
  sectionsElements.forEach((section, index) => {
    const heading = section.querySelector('h2');
    if (heading) {
      // Generate ID from heading text
      const headingText = heading.textContent.trim();
      const id = headingText.toLowerCase().replace(/\s+/g, '-');

      // Set the ID on the section element if it doesn't have one
      if (!section.id) {
        section.setAttribute('id', id);
      }

      section.classList.add('faded');

      // Calculate active position
      const activePosition = getActivePositionForSection(heading);

      // Create section object
      parsedSections.push({
        index, // Add index property
        id: section.id, // Use the actual section ID (might be different from generated id)
        menuItemId: `target-${section.id}`,
        element: section,
        heading,
        activePosition,
      });
    }
  });

  console.log('Sections parsed:', parsedSections);
  return parsedSections;
}

function scrollTo(targetPosition) {
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
}

function initSmoothScrolling() {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('#menu a').forEach((anchor) => {
    anchor.addEventListener('click', function clickOnMenu(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(`${targetId} h2`);
      const targetSection = sectionActivePositions.find((section) => section.id === targetId);

      const targetPosition = targetSection
        ? targetSection.activePosition
        : getActivePositionForSection(targetElement);

      if (targetElement) {
        scrollTo(targetPosition);
      }
    });
  });
}

function updateMenu(idOfSectionThatShouldBeActive) {
  // Get all menu items
  const menuItems = document.querySelectorAll('#menu li');

  // Find the active section in our sections array
  const activeSection = sections.find((section) => section.id === idOfSectionThatShouldBeActive);

  if (!activeSection) {
    console.warn('Active section not found:', idOfSectionThatShouldBeActive);
    return;
  }

  // Get the index of the active section
  const activeSectionIndex = activeSection.index;

  // Process each menu item
  menuItems.forEach((menuItem) => {
    // Remove any existing classes
    menuItem.classList.remove('prev', 'next', 'active');

    // Get the section ID this menu item links to
    const link = menuItem.querySelector('a');
    if (!link) return;

    const targetSectionId = link.getAttribute('href').substring(1);

    // Find the target section
    const targetSection = sections.find((section) => section.id === targetSectionId);

    if (!targetSection) return;

    // Compare indices to determine position relative to active section
    if (targetSection.index < activeSectionIndex) {
      // Section comes before active section
      menuItem.classList.add('prev');
    } else if (targetSection.index > activeSectionIndex) {
      // Section comes after active section
      menuItem.classList.add('next');
    } else {
      // This is the active section
      menuItem.classList.add('active');
    }
  });

  console.log('Menu updated for active section:', idOfSectionThatShouldBeActive);
}

function changeActiveSection(currentlyActiveSection, idOfSectionThatShouldBeActive) {
  // First, reset all sections to low opacity
  document.querySelectorAll('section').forEach((section) => {
    section.classList.remove('active');
    section.classList.add('faded');
  });

  // Then activate the target section
  const sectionThatShouldBeActive = document.querySelector(`#${idOfSectionThatShouldBeActive}`);
  if (sectionThatShouldBeActive) {
    sectionThatShouldBeActive.classList.add('active');
    sectionThatShouldBeActive.classList.remove('faded');
    sectionThatShouldBeActive.classList.remove('invisible');
    console.log('Activated section:', idOfSectionThatShouldBeActive);

    // Hide menu if section has 'showcase-item' class, otherwise show menu
    const menuElement = document.getElementById('menu');
    const showcasesNav = document.getElementById('showcases-nav');
    if (sectionThatShouldBeActive.classList.contains('showcase-item')) {
      menuElement.classList.add('menu-horizontal');
      menuElement.classList.remove('menu-hidden');
      showcasesNav.classList.add('visible');
    } else {
      menuElement.classList.remove('menu-horizontal');
      menuElement.classList.remove('menu-hidden');
      showcasesNav.classList.remove('visible');
    }
  } else {
    console.warn('Section not found:', idOfSectionThatShouldBeActive);
  }

  // Update the menu
  updateMenu(idOfSectionThatShouldBeActive);
}

function activateSection() {
  const currentScrollPosition = window.scrollY;
  const currentlyActiveSection = document.querySelector('section.active');
  const currentlyActiveSectionId = currentlyActiveSection?.getAttribute('id');

  // Find the section closest to the middle of the viewport
  let idOfSectionThatShouldBeActive = '';

  sections.forEach((section) => {
    const distance = Math.abs(section.activePosition - currentScrollPosition);
    if (distance < 200) {
      idOfSectionThatShouldBeActive = section.id;
    }
  });

  if (idOfSectionThatShouldBeActive && idOfSectionThatShouldBeActive !== currentlyActiveSectionId) {
    changeActiveSection(currentlyActiveSection, idOfSectionThatShouldBeActive);
  }
}

function buildMenu() {
  const menuElement = document.getElementById('menu');

  // Create ul element if it doesn't exist
  let menuList = menuElement.querySelector('ul');
  if (!menuList) {
    menuList = document.createElement('ul');
    menuElement.appendChild(menuList);
  } else {
    // Clear existing menu items
    menuList.innerHTML = '';
  }

  // Add menu items for each section
  sections.forEach((section) => {
    if (
      section.heading.textContent === 'Me'
      || section.heading.classList.contains('invisible')
      || section.element.classList.contains('showcase-item')
    ) {
      return;
    }

    // Create list item
    const listItem = document.createElement('li');
    listItem.id = section.menuItemId;
    listItem.classList.add('next');

    // Create anchor
    const anchor = document.createElement('a');
    anchor.href = `#${section.id}`;
    anchor.textContent = section.heading.textContent;

    // Append anchor to list item
    listItem.appendChild(anchor);

    // Append list item to menu
    menuList.appendChild(listItem);
  });

  // --- Build showcases-nav ---
  const showcasesNav = document.getElementById('showcases-nav');
  if (showcasesNav) {
    showcasesNav.innerHTML = '';

    const showcaseItems = document.querySelectorAll('.showcase-item');
    if (showcaseItems.length > 0) {
      const navList = document.createElement('ul');
      showcaseItems.forEach((item, idx) => {
        const showcaseTitle = item.querySelector('h2')?.textContent?.trim() || `Showcase ${idx + 1}`;
        const showcaseId = item.id || `showcase-item-${idx}`;
        item.setAttribute('id', showcaseId);
        const navLi = document.createElement('li');
        const navA = document.createElement('a');
        navA.href = `#${showcaseId}`;
        navA.textContent = showcaseTitle;
        navA.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(showcaseId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
        navLi.appendChild(navA);
        navList.appendChild(navLi);
      });
      showcasesNav.appendChild(navList);
    }
  }

  console.log('Menu built with', sections.length, 'items');
}

document.addEventListener('DOMContentLoaded', () => {
  sections.push(...parseSections());
  buildMenu();
  scrollTo(sections[0].activePosition);
  typeAnimation();
  initSmoothScrolling();

  // Add scroll event listener
  window.addEventListener('scroll', activateSection);

  // Call once on page load to set initial state
  activateSection();
});
