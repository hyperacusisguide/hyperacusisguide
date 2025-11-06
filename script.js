// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const scrollableElements = document.querySelectorAll('main, main article');

// Variable to store the scroll position when the menu is open
let scrollPosition = 0; 

// ---------- Hamburger Menu Toggle (iOS Scroll Lock + Scrollbar Hide) ----------
hamburger.addEventListener('click', () => {
    const isMenuOpen = sidebar.classList.contains('open');

    if (isMenuOpen) {
        // --- CLOSING THE MENU ---
        sidebar.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        // Restore scroll position
        window.scrollTo(0, scrollPosition);

        // Remove inline styles used for scroll locking
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');

        // Restore scrollable children
        scrollableElements.forEach(el => {
            el.style.overflow = '';
            el.style.webkitOverflowScrolling = '';
        });

    } else {
        // --- OPENING THE MENU ---
        // 1. Record current scroll position
        scrollPosition = window.scrollY;

        // 2. Apply menu-open class first to trigger CSS
        sidebar.classList.add('open');
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');

        // 3. Lock body scroll
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';

        // 4. Hide scrollbars on scrollable children
        scrollableElements.forEach(el => {
            el.style.overflow = 'hidden';
            el.style.webkitOverflowScrolling = 'auto'; // disables momentum scrolling
        });

        // 5. Force a reflow to ensure scrollbars disappear instantly on iOS
        document.body.offsetHeight;
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
