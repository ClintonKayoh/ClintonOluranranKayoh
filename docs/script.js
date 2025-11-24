// Sidebar toggle
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', () => {
  hamburger.classList.remove('active');
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeMenu = document.getElementById('themeMenu');
const themeOptions = document.querySelectorAll('.theme-option');
const currentThemeName = document.getElementById('currentThemeName');
const html = document.documentElement;

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'default';
const savedThemeName = localStorage.getItem('themeName') || 'Default';

if (savedTheme !== 'default') {
  html.setAttribute('data-theme', savedTheme);
}
currentThemeName.textContent = savedThemeName;

// Update active theme option
themeOptions.forEach(option => {
  if (option.dataset.theme === savedTheme) {
    option.classList.add('active');
  } else {
    option.classList.remove('active');
  }
});

// Toggle theme menu
themeToggleBtn.addEventListener('click', () => {
  themeMenu.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!themeToggleBtn.contains(e.target) && !themeMenu.contains(e.target)) {
    themeMenu.classList.remove('active');
  }
});

// Change theme
themeOptions.forEach(option => {
    option.addEventListener('mouseenter', () => {
        const theme = option.dataset.theme;
        if (theme === 'default') {
            html.removeAttribute('data-theme');
        } else {
            html.setAttribute('data-theme', theme);
        }
    });

    option.addEventListener('mouseleave', () => {
        // Revert to the currently saved theme after hover ends
        const savedTheme = localStorage.getItem('theme') || 'default';
        if (savedTheme === 'default') {
            html.removeAttribute('data-theme');
        } else {
            html.setAttribute('data-theme', savedTheme);
        }
    });

    option.addEventListener('click', () => {
        const theme = option.dataset.theme;
        const themeName = option.querySelector('span').textContent;
        themeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
        currentThemeName.textContent = themeName;
        localStorage.setItem('theme', theme);
        localStorage.setItem('themeName', themeName);
        themeMenu.classList.remove('active');
    });
});

let currentIndex = 0;

// Make theme menu scrollable and keyboard-navigable
themeMenu.addEventListener('keydown', (e) => {
  const total = themeOptions.length;
  
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    currentIndex = (currentIndex + 1) % total;
    updateActiveThemeOption();
  } 
  else if (e.key === 'ArrowUp') {
    e.preventDefault();
    currentIndex = (currentIndex - 1 + total) % total;
    updateActiveThemeOption();
  } 
  else if (e.key === 'Enter') {
    e.preventDefault();
    applyTheme(themeOptions[currentIndex]);
  }
});

// Automatically highlight the active theme visually
function updateActiveThemeOption() {
  themeOptions.forEach(opt => opt.classList.remove('active'));
  const currentOption = themeOptions[currentIndex];
  currentOption.classList.add('active');

  // Scroll smoothly to keep it visible
  currentOption.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Optional: live preview the theme as you move (remove if you only want Enter to apply)
  const theme = currentOption.dataset.theme;
  if (theme === 'default') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }
}

// Apply theme when Enter is pressed
function applyTheme(option) {
  const theme = option.dataset.theme;
  const themeName = option.querySelector('span').textContent;

  themeOptions.forEach(opt => opt.classList.remove('active'));
  option.classList.add('active');

  if (theme === 'default') {
    html.removeAttribute('data-theme');
  } else {
    html.setAttribute('data-theme', theme);
  }

  currentThemeName.textContent = themeName;

  localStorage.setItem('theme', theme);
  localStorage.setItem('themeName', themeName);

  themeMenu.classList.remove('active');
}


// Enable keyboard scrolling within theme menu
themeMenu.addEventListener('keydown', (e) => {
  const scrollAmount = 40; // pixels to scroll per key press

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    themeMenu.scrollBy({ top: scrollAmount, behavior: 'smooth' });
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    themeMenu.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
  }
});

document.getElementById('textToggle').addEventListener('click', function() {
  const body = document.body;
  
  // Toggle a class that changes text color
  body.classList.toggle('black-text-mode');
  
  // Optionally, update button text
  if (body.classList.contains('black-text-mode')) {
    this.textContent = "🔆 Normal Text";
  } else {
    this.textContent = "🌓 Black Text";
  }
});

// Text to type
const paragraphs = [
    "Hey there, and welcome to my academic corner! I'm Clinton, and I'm delighted you've found my corner of the web. My curiosity about the world is boundless and I believe everything in it is math inclined, so I use math to try and figure out how everything works. This page is basically a peek into my intellectual playground, showing the projects and ideas that really drive me.",
    "Right now, I spend most of my time digging into Mathematical Biology, which is where I get to use precise equations and networks to model complex biological processes and systems. But my interests are pretty broad: I also enjoy the deep structure of Differential equations, Semigroup & Graph Theory, figuring out the most efficient way to solve problems using Optimization technique, and making sure our equations actually work in the real world with Numerical Methods. In all my vision is to try to use all these mathematical techniques to understand biological processes, human activities and all there is to it.",
    "To me, math isn't just numbers; it's the language that reveals the hidden rules governing everything, from abstract theory to natural phenomena. Feel free to explore my research, see what projects I'm working on right now, and check out some of my thoughts. Whether you're a scientist, a curious student, or just someone who loves learning, I hope this corner of the internet gives you a little spark of inspiration and a sense of wonder about the endless possibilities that mathematics holds.",
    "I appreciate you visiting, and I'm excited to share this journey with you!"
];

const typingSpeed = 15; // milliseconds per character
const pauseBetweenParagraphs = 500; // pause between paragraphs

let currentParagraph = 0;
let currentChar = 0;
let isTyping = false;
let shouldContinueTyping = true; // Flag to control typing

const paragraphElements = document.querySelectorAll('#typingText p');

function typeText() {
    if (!shouldContinueTyping) return; // Stop typing if flag is false
    
    if (currentParagraph >= paragraphs.length) {
        return; // All paragraphs typed
    }

    const paragraph = paragraphs[currentParagraph];
    const element = paragraphElements[currentParagraph];

    if (currentChar < paragraph.length) {
        element.style.opacity = '1';
        element.textContent += paragraph.charAt(currentChar);
        
        // Add cursor to current paragraph
        if (currentChar === paragraph.length - 1) {
            element.innerHTML += '<span class="typing-cursor"></span>';
        }
        
        currentChar++;
        if (shouldContinueTyping) { // Check flag before setting timeout
            setTimeout(typeText, typingSpeed);
        }
    } else {
        // Remove cursor from completed paragraph
        const cursor = element.querySelector('.typing-cursor');
        if (cursor) {
            cursor.remove();
        }
        
        // Move to next paragraph
        currentParagraph++;
        currentChar = 0;
        
        if (shouldContinueTyping) { // Check flag before setting timeout
            setTimeout(typeText, pauseBetweenParagraphs);
        }
    }
}

// Start typing when page loads
window.addEventListener('load', () => {
    setTimeout(typeText, 500);
});

// Optional: Add skip typing button
let skipButton = null;

function createSkipButton() {
    skipButton = document.createElement('button');
    skipButton.textContent = 'Skip Animation';
    skipButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid white;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        backdrop-filter: blur(10px);
        z-index: 1000;
    `;
    skipButton.addEventListener('click', skipTyping);
    document.body.appendChild(skipButton);
}

function skipTyping() {
    shouldContinueTyping = false; // Set flag to false to stop typing
    paragraphElements.forEach((element, index) => {
        element.style.opacity = '1';
        element.textContent = paragraphs[index];
    });
    document.querySelector('.hero-cta').style.opacity = '1';
    if (skipButton) {
        skipButton.remove();
    }
}

// Create skip button after a delay
setTimeout(createSkipButton, 2000);


