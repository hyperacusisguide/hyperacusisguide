// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const hamburgerWrapper = document.getElementById('hamburger-wrapper'); // wrapper div
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');
const backToTop = document.querySelector('.back-to-top');

// Theme & Logo Elements (Synchronized with HTML <head> snippet)
const darkModeToggle = document.querySelector('.dark-mode-align'); // Selects the clickable div
const logoImage = document.querySelector('.logo-image'); 
const html = document.documentElement; // Represents the <html> tag

const THEME_KEY = 'userTheme'; // Key for localStorage
// --- DEFINE LOGO PATHS HERE (ADJUST FOLDER NAME IF NECESSARY) ---
const DARK_LOGO_PATH = 'hg.png'; 
const LIGHT_LOGO_PATH = 'hg-light.png'; 

let scrollPosition = 0;

// ---------- Dark/Light Mode Logic (Fixed and Synchronized) ----------

/**
 * Toggles the theme, applies the class, saves the preference, and swaps the logo.
 * @param {boolean} isLight - True for light mode, false for dark mode.
 */
function setTheme(isLight) {
    if (isLight) {
        // Switch to LIGHT MODE
        html.classList.add('light-mode');
        localStorage.setItem(THEME_KEY, 'light');
        
        // LOGO SWAP: light-logo.png
        if (logoImage) {
            logoImage.src = LIGHT_LOGO_PATH;
        }
    } else {
        // Switch to DARK MODE
        html.classList.remove('light-mode');
        localStorage.setItem(THEME_KEY, 'dark');

        // LOGO SWAP: logo.png (default)
        if (logoImage) {
            logoImage.src = DARK_LOGO_PATH;
        }
    }
}

// 2. Add Event Listener for Manual Toggle
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => { 
        // Check if the current theme is light (by checking the class on <html>)
        const isCurrentlyLight = html.classList.contains('light-mode');
        
        // Toggle the theme: if currently light, switch to dark (isLight = false), and vice versa.
        setTheme(!isCurrentlyLight); 
    });
}


// ---------- Hamburger Menu Toggle ----------
function toggleMenu() {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) closeMenu();
    else openMenu();
}

function openMenu() {
    scrollPosition = window.scrollY || window.pageYOffset;

    sidebar.classList.add('open');
    hamburger.classList.add('active');
    document.body.classList.add('menu-open');
    document.documentElement.classList.add('menu-open');

    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.position = 'fixed';

    animateSidebarLinks(true);
}

function closeMenu() {
    sidebar.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.documentElement.classList.remove('menu-open');

    // Remove the fixed positioning first
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('position');
    
    // Immediately restore the original scroll position
    window.scrollTo(0, scrollPosition);

    animateSidebarLinks(false);
}

// ---------- Animate Sidebar Links ----------
function animateSidebarLinks(open) {
    sidebarLinks.forEach((link, index) => {
        link.style.transition = `opacity 0.25s ease ${index * 0.05}s, transform 0.25s ease ${index * 0.05}s, background-color 0.3s ease`;
        if (open) {
            link.style.opacity = '1';
            link.style.transform = 'translateY(0)';
        } else {
            link.style.opacity = '0';
            link.style.transform = 'translateY(-10px)';
        }
    });
}

// ---------- Highlight Current Page & Touch Feedback ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
sidebarLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);

    // Close menu on link click
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) closeMenu();
    });

    // Touch feedback
    link.addEventListener('touchstart', () => link.classList.add('tap-active'));
    link.addEventListener('touchend', () => setTimeout(() => link.classList.remove('tap-active'), 180));
    link.addEventListener('touchcancel', () => link.classList.remove('tap-active'));
    link.addEventListener('touchmove', () => link.classList.remove('tap-active'));
});

// ---------- Close sidebar when clicking outside ----------
document.addEventListener('click', e => {
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !hamburgerWrapper.contains(e.target)) { // wrapper included
        closeMenu();
    }
});

// ---------- Close sidebar on Escape ----------
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) closeMenu();
});

// ---------- Initialize sidebar links state for mobile ----------
if (window.innerWidth <= 768) {
    sidebarLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
    });
}

// ---------- Handle Window Resize ----------
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');

        sidebarLinks.forEach(link => {
            link.style.opacity = '';
            link.style.transform = '';
        });
    }
});

// ---------- Back to Top Button ----------
function initBackToTop() {
    if (!backToTop) return;

    backToTop.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

window.addEventListener('scroll', () => {
    if (!backToTop) return;
    backToTop.classList.toggle('show', window.scrollY > 100);
});

// ---------- Initialize (Runs on DOMContentLoaded) ----------
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
});

// ---------- Wrapper click triggers hamburger ----------
if (hamburgerWrapper) {
    hamburgerWrapper.addEventListener('click', () => {
        toggleMenu();
    });
}


// --- Image Matching Function ---
const img1 = document.querySelector('.img-1');
const img2 = document.querySelector('.img-2');

function matchHeight() {
    // Safety check to ensure images exist before trying to match them
    if (!img1 || !img2) return;

    // const containerWidth = img1.parentElement.clientWidth; // Currently unused

    // scale first image to max 50% of container width
    img1.style.width = '54.35%';
    img1.style.height = 'auto';

    // match second image height dynamically
    const h = img1.clientHeight;
    img2.style.height = `${h}px`;
    img2.style.width = 'auto';
}

// run on load and resize
window.addEventListener('load', matchHeight);
window.addEventListener('resize', matchHeight);


// --- Copy Anchor Link Function ---
function copyAnchorLink(button) {
    const anchorId = button.getAttribute('data-anchor');
    const url = window.location.origin + window.location.pathname + '#' + anchorId;
    
    // Configuration Constants
    const DISPLAY_TIME_MS = 2000;
    const FADE_TIME_MS = 300; // Matches your CSS transition time (0.3s)

    navigator.clipboard.writeText(url)
        .then(() => {
            const overlay = document.getElementById('copy-overlay');
            if (!overlay) return; // Safety check

            // 1. Show the overlay
            overlay.style.display = 'flex'; 
            overlay.classList.add('show');

            // 2. Start the fade-out after display time
            setTimeout(() => {
                // Initiate the CSS transition (opacity: 1 -> 0)
                overlay.classList.remove('show'); 

                // 3. CRITICAL Cleanup: Wait for the 0.3s fade to finish, then hide
                setTimeout(() => {
                    // Forces a complete cleanup of the rendering layer
                    overlay.style.display = 'none'; 
                }, FADE_TIME_MS);

            }, DISPLAY_TIME_MS);
        })
        .catch(err => console.error('Failed to copy failed: ', err));
}

