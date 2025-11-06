// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');

// ---------- Hamburger Menu Toggle ----------
hamburger.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);

  // Instantly hide scrollbar when menu opens (mobile only)
  if (isOpen && window.innerWidth <= 768) {
    document.documentElement.style.overflow = 'hidden';
  } else {
    document.documentElement.style.overflow = '';
  }
});

// ---------- Highlight Current Page in Sidebar ----------
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

document.querySelectorAll('#sidebar ul li a').forEach(link => {
  const linkPage = link.getAttribute('href');
  link.classList.toggle('active', linkPage === currentPage);
});

// ---------- Tap Feedback on Touch Devices ----------
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
