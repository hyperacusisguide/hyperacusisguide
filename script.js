// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');

// Variable to store the scroll position when the menu is open
let scrollPosition = 0;

// ---------- Hamburger Menu Toggle (iOS Scroll Lock + Scrollbar Hide) ----------
hamburger.addEventListener('click', () => {
    const isMenuOpen = sidebar.classList.contains('open');

    if (isMenuOpen) {
        // --- CLOSING THE MENU ---
        sidebar.classList.remove('open');
        hamburger.classList.remove('active'); // animate back to hamburger
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');

        // Restore scroll position
        window.scrollTo(0, scrollPosition);

        // Remove inline styles used for scroll locking
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');

        // Animate sidebar links back
        animateSidebarLinks(false);
    } else {
        // --- OPENING THE MENU ---
        scrollPosition = window.scrollY || window.pageYOffset;

        sidebar.classList.add('open');
        hamburger.classList.add('active'); // animate to X
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');

        // Lock scroll
        document.body.style.top = `-${scrollPosition}px`;
        document.body.style.position = 'fixed';

        // Animate sidebar links
        animateSidebarLinks(true);
    }
});

// ---------- Highlight Current Page in Sidebar ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.toggle('active', linkPage === currentPage);

    // Close sidebar when a link is clicked (mobile)
    link.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
            document.documentElement.classList.remove('menu-open');
            document.body.style.removeProperty('top');
            document.body.style.removeProperty('position');
            animateSidebarLinks(false);
        }
    });
});

// ---------- Add Tap Feedback on Touch Devices (SINGLE SET ONLY) ----------
sidebarLinks.forEach(link => {
    link.addEventListener('touchstart', () => {
        link.classList.add('tap-active');
    });

    link.addEventListener('touchend', () => {
        setTimeout(() => link.classList.remove('tap-active'), 180);
    });

    link.addEventListener('touchcancel', () => {
        link.classList.remove('tap-active');
    });

    link.addEventListener('touchmove', () => {
        link.classList.remove('tap-active');
    });
});

// ---------- Close sidebar when clicking outside (optional) ----------
document.addEventListener('click', (e) => {
    if (sidebar.classList.contains('open') &&
        !sidebar.contains(e.target) &&
        !hamburger.contains(e.target)) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');
        animateSidebarLinks(false);
    }
});

// ---------- Close sidebar on Escape key ----------
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('position');
        animateSidebarLinks(false);
    }
});

// ---------- Animate Sidebar Links (staggered fade) ----------
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

// ---------- Initialize sidebar links state ----------
if (window.innerWidth <= 768) {
    sidebarLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(-10px)';
    });
}

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

        // Reset sidebar links opacity/transform (if using stagger animation)
        sidebar.querySelectorAll('a').forEach(link => {
            link.style.opacity = '';
            link.style.transform = '';
        });
    }
});

const backToTop = document.querySelector('.back-to-top');

// Show button after scrolling down 100px
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});