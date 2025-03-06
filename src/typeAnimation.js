const words = ['learnings.', 'insights.', 'stories.'];
let targetElement;
let wordIndex = 0;
let charIndex = 0;
let isTyping = true;

function animateText() {
  const currentWord = words[wordIndex];

  if (isTyping) {
    // Typing logic
    if (charIndex < currentWord.length) {
      targetElement.innerHTML = currentWord.substring(0, charIndex + 1);
      charIndex += 1; // Fixed: replaced ++ with += 1
      setTimeout(animateText, 300);
    } else {
      // Switch to erasing mode
      isTyping = false;
      setTimeout(animateText, 50);
    }
  } else if (charIndex > 0) { // Fixed: restructured to avoid lonely if
    // Erasing logic
    charIndex -= 1; // Fixed: replaced -- with -= 1
    targetElement.innerHTML = currentWord.substring(0, charIndex);
    setTimeout(animateText, 50);
  } else {
    // Word completely erased, move to next word
    wordIndex = (wordIndex + 1) % words.length;
    isTyping = true;
    setTimeout(animateText, 300);
  }
}

export default function typeAnimation() {
  // Initialize DOM element reference
  targetElement = document.getElementById('type');

  // Reset animation state
  wordIndex = 0;
  charIndex = 0;
  isTyping = true;

  // Start the animation
  animateText();
}
