// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

let scrollPosition = 0;

// ---------- Hamburger Menu Toggle ----------
hamburger.addEventListener('click', () => {
    const isMenuOpen = sidebar.classList.contains('open');

    if (isMenuOpen) {
        // --- CLOSE MENU ---
        sidebar.classList.remove('open');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        window.scrollTo(0, scrollPosition);
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');

    } else {
        // --- OPEN MENU ---
        scrollPosition = window.scrollY;

        sidebar.classList.add('open');
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');

        // Lock body scroll
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
