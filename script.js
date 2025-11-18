// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const hamburgerWrapper = document.getElementById('hamburger-wrapper'); // wrapper div
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');
const backToTop = document.querySelector('.back-to-top');

let scrollPosition = 0;

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

    window.scrollTo(0, scrollPosition);

    document.body.style.removeProperty('top');
    document.body.style.removeProperty('position');

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

// ---------- Highlight Current Page ----------
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

// ---------- Initialize ----------
document.addEventListener('DOMContentLoaded', () => {
    initBackToTop();
});

// ---------- Wrapper click triggers hamburger ----------
hamburgerWrapper.addEventListener('click', () => {
    toggleMenu();
});

const img1 = document.querySelector('.img-1');
const img2 = document.querySelector('.img-2');

function matchHeight() {
  const containerWidth = img1.parentElement.clientWidth;
  
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


function copyAnchorLink(button) {
  // Get the target anchor ID
  const anchorId = button.getAttribute('data-anchor');
  
  // Build the full URL
  const url = window.location.origin + window.location.pathname + '#' + anchorId;

  // Configuration Constants
  const DISPLAY_TIME_MS = 2000; // How long the overlay is fully visible
  const FADE_TIME_MS = 300;   // Must match the CSS transition time (0.3s)

  // Copy to clipboard
  navigator.clipboard.writeText(url)
    .then(() => {
      const overlay = document.getElementById('copy-overlay');

      // 1. Prepare to Fade In
      // Must set display property first, before adding 'show' class
      overlay.style.display = 'flex'; 
      
      // Forces a repaint/reflow before applying the transition for the fade-in
      requestAnimationFrame(() => {
        // Fade In overlay (opacity: 0 -> 1)
        overlay.classList.add('show');
      });

      // 2. Start the Fade Out after display time
      setTimeout(() => {
        // Initiate the CSS transition (opacity: 1 -> 0)
        overlay.classList.remove('show'); 

        // 3. CRITICAL FIX: Wait for the transition to finish, then hide
        setTimeout(() => {
          // This forces a complete cleanup of the fixed element's rendering layer
          overlay.style.display = 'none'; 
        }, FADE_TIME_MS);

      }, DISPLAY_TIME_MS);
    })
    .catch(err => console.error('Failed to copy failed: ', err));
}

