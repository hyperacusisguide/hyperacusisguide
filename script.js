// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ---------- Hamburger Menu Toggle ----------
hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  document.body.classList.toggle('menu-open'); // Locks background scroll on mobile
});

// ---------- Highlight Current Page in Sidebar ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('#sidebar ul li a').forEach(link => {
  const linkPage = link.getAttribute('href');
  link.classList.toggle('active', linkPage === currentPage);
});

// Add tap feedback on touch devices
document.querySelectorAll('nav#sidebar ul li a').forEach(link => {
  link.addEventListener('touchstart', () => {
    link.classList.add('tap-active'); // highlight immediately on tap
  });

  link.addEventListener('touchend', () => {
    // remove highlight shortly after lifting finger
    setTimeout(() => {
      link.classList.remove('tap-active');
    }, 150); // 150ms is enough to show brief feedback
  });

  // optional: remove highlight if user scrolls instead of tapping
  link.addEventListener('touchmove', () => {
    link.classList.remove('tap-active');
  });
});
