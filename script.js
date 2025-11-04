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

// Track touch scroll
let isTouchScrolling = false;

sidebar.addEventListener('touchstart', () => {
  isTouchScrolling = false;
});

sidebar.addEventListener('touchmove', () => {
  isTouchScrolling = true;
});

sidebar.querySelectorAll('a').forEach(link => {
  link.addEventListener('touchend', (e) => {
    if (isTouchScrolling) e.preventDefault(); // cancel click if scrolling
    isTouchScrolling = false;
  });
});