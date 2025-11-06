document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // ?? CRITICAL FIX: Ensure scroll lock is OFF when the page loads
    // This removes the classes that persist across page navigation.
    document.body.classList.remove('menu-open');
    // document.getElementById('sidebar')?.classList.remove('open'); // Optional, but good practice
    // ------------------------------------------------------------------

    // ---------- DOM Elements ----------
    const hamburger = document.getElementById('hamburger');
    const sidebar = document.getElementById('sidebar');

    // Check if elements exist before attaching listeners
    if (hamburger && sidebar) {
        // ---------- Hamburger Menu Toggle ----------
        hamburger.addEventListener('click', () => {
            // Toggles the 'open' class on the sidebar (for animation)
            sidebar.classList.toggle('open');
            
            // Toggles the 'menu-open' class on the body (for scroll lock)
            document.body.classList.toggle('menu-open'); 
        });
    }

    // ---------- Sidebar Link Handlers ----------
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    document.querySelectorAll('#sidebar ul li a').forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        
        // Highlight current page
        link.classList.toggle('active', linkPage === currentPage);

        // Closes menu immediately when a link is clicked
        link.addEventListener('click', () => {
            // Only attempt to remove classes if the menu is actually open
            if (sidebar?.classList.contains('open')) {
                sidebar.classList.remove('open');
                document.body.classList.remove('menu-open');
            }
        });

        // Add tap feedback on touch devices
        link.addEventListener('touchstart', () => {
            link.classList.add('tap-active');
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
});