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

