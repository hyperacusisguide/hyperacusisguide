// ---------- Initial State Reset (Crucial Fix) ----------
// Ensures scroll lock is disabled when the page first loads,
// in case the browser held onto the class from a previous navigation.
document.body.classList.remove('menu-open');
document.getElementById('sidebar')?.classList.remove('open');


// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ---------- Hamburger Menu Toggle ----------
hamburger.addEventListener('click', () => {
  // This correctly toggles the open state for the menu and the scroll lock for the body.
  sidebar.classList.toggle('open');
  document.body.classList.toggle('menu-open'); // Locks background scroll on mobile
});

// ---------- Highlight Current Page in Sidebar ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('#sidebar ul li a').forEach(link => {
  const linkPage = link.getAttribute('href').split('/').pop(); // Ensure you compare filenames
  link.classList.toggle('active', linkPage === currentPage);

  // OPTIONAL: Immediately close the menu when a link is clicked
  link.addEventListener('click', () => {
    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        document.body.classList.remove('menu-open');
    }
  });
});

// Add tap feedback on touch devices (Keep this as is)
document.querySelectorAll('nav#sidebar ul li a').forEach(link => {
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