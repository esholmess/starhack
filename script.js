document.addEventListener('DOMContentLoaded', () => {
    // Load the theme from localStorage if available
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        applyTheme(savedTheme);
    }

    document.getElementById('originalTheme').addEventListener('click', () => {
        applyTheme('original-theme');
    });

    document.getElementById('darkTheme').addEventListener('click', () => {
        applyTheme('dark-theme');
    });

    document.getElementById('redPinkTheme').addEventListener('click', () => {
        applyTheme('red-pink-theme');
    });

    document.getElementById('rainbowTheme').addEventListener('click', () => {
        applyTheme('rainbow-theme');
    });

    function applyTheme(theme) {
        // Remove all other theme classes
        document.body.classList.remove('original-theme', 'dark-theme', 'red-pink-theme', 'rainbow-theme');
        
        // Add the selected theme class
        document.body.classList.add(theme);
        
        // Apply specific theme to other elements
        document.querySelector('header').classList.remove('original-theme', 'dark-theme', 'red-pink-theme', 'rainbow-theme');
        document.querySelector('nav').classList.remove('original-theme', 'dark-theme', 'red-pink-theme', 'rainbow-theme');
        document.querySelector('footer').classList.remove('original-theme', 'dark-theme', 'red-pink-theme', 'rainbow-theme');
        document.querySelector('.banner').classList.remove('original-theme', 'dark-theme', 'red-pink-theme', 'rainbow-theme');
        
        document.querySelector('header').classList.add(theme);
        document.querySelector('nav').classList.add(theme);
        document.querySelector('footer').classList.add(theme);
        document.querySelector('.banner').classList.add(theme);

        // Save the selected theme to localStorage
        localStorage.setItem('theme', theme);
    }

    // Smooth scroll to "products" section when "İNCELEMEYE BAŞLA" button is clicked
    document.getElementById('exploreButton').addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector('#products').scrollIntoView({ behavior: 'smooth' });
    });
});
