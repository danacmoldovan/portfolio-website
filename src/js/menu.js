function activateMenuItem() {
    let index = sections.length;

    while (index > 0 && window.scrollY + offset < sections[index - 1].offsetTop) {
        index -= 1;
    }

    menuItems.forEach((item, i) => {
        const displayStyle = i === index ? 'none' : 'block';
        const itemCopy = item;
        itemCopy.style.display = displayStyle;
    });

    sections.forEach((section, i) => {
        section.classList.toggle('active-section', i === index);
    });

    menuPrev.innerHTML = '';
    menuNext.innerHTML = '';

    menuItems.slice(0, index).forEach((item) => menuPrev.appendChild(item.cloneNode(true)));
    menuItems.slice(index + 1).forEach((item) => menuNext.appendChild(item.cloneNode(true)));
}

activateMenuItem();
window.addEventListener('scroll', activateMenuItem);