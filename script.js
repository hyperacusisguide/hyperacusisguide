// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// Variable to store the scroll position when the menu is open
let scrollPosition = 0; 

// ---------- Hamburger Menu Toggle (iOS Scroll Lock + Scrollbar Hide) ----------
hamburger.addEventListener('click', () => {
    const isMenuOpen = sidebar.classList.contains('open');

    if (isMenuOpen) {
        // --- CLOSING THE MENU ---
        sidebar.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        // Restore scroll position
        window.scrollTo(0, scrollPosition);

        // Remove inline styles used for scroll locking
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');

    } else {
        // Save current scroll position
        scrollPosition = window.scrollY;

        // Apply class first so CSS hides scrollbar immediately
        sidebar.classList.add('open');
        hamburger.classList.add('active');
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');

        // Apply scroll lock
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';
    }
});

// ---------- Highlight Current Page in Sidebar ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('#sidebar ul li a').forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.toggle('active', linkPage === currentPage);
});

// ---------- Add Tap Feedback on Touch Devices ----------
document.querySelectorAll('nav#sidebar ul li a').forEach(link => {
    link.addEventListener('touchstart', () => {
        link.classList.add('tap-active'); // highlight immediately on tap
    });

    link.addEventListener('touchend', () => {
        setTimeout(() => {
            link.classList.remove('tap-active');
        }, 150);
    });

    link.addEventListener('touchmove', () => {
        link.classList.remove('tap-active');
    });
});

// ---------- Handle Window Resize (mobile ? desktop) ----------
window.addEventListener('resize', () => {
    const isDesktop = window.innerWidth > 768;

    if (isDesktop) {
        // Remove mobile-specific styles
        sidebar.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        // Remove scroll lock
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');
    }
});
