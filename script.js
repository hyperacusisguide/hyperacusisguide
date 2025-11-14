// ---------- DOM Elements ----------
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarLinks = sidebar.querySelectorAll('a');
const backToTop = document.querySelector('.back-to-top');

// Store scroll position
let scrollPosition = 0;

// ---------- Scroll Lock Helpers ----------
function lockScroll() {
    scrollPosition = window.scrollY || window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
}

function unlockScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
}

// ---------- Hamburger Toggle ----------
hamburger.addEventListener("click", () => {
    const isOpen = sidebar.classList.contains("open");

    if (isOpen) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
        unlockScroll();
        animateSidebarLinks(false);
    } else {
        sidebar.classList.add("open");
        hamburger.classList.add("active");
        document.body.classList.add('menu-open');
        document.documentElement.classList.add('menu-open');
        lockScroll();
        animateSidebarLinks(true);
    }
});

// ---------- Highlight Current Page ----------
const currentPage = window.location.pathname.split("/").pop() || "index.html";

sidebarLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    link.classList.toggle("active", linkPage === currentPage);

    // Close menu on mobile when link clicked
    link.addEventListener("click", () => {
        if (sidebar.classList.contains("open")) {
            sidebar.classList.remove("open");
            hamburger.classList.remove("active");
            document.body.classList.remove("menu-open");
            document.documentElement.classList.remove("menu-open");
            unlockScroll();
            animateSidebarLinks(false);
        }
    });
});

// ---------- Touch Feedback ----------
sidebarLinks.forEach(link => {
    link.addEventListener("touchstart", () => link.classList.add("tap-active"));
    link.addEventListener("touchend", () => setTimeout(() => link.classList.remove("tap-active"), 180));
    link.addEventListener("touchcancel", () => link.classList.remove("tap-active"));
    link.addEventListener("touchmove", () => link.classList.remove("tap-active"));
});

// ---------- Click Outside to Close ----------
document.addEventListener("click", (e) => {
    if (
        sidebar.classList.contains("open") &&
        !sidebar.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
        document.documentElement.classList.remove("menu-open");
        unlockScroll();
        animateSidebarLinks(false);
    }
});

// ---------- ESC Key Close ----------
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
        document.documentElement.classList.remove("menu-open");
        unlockScroll();
        animateSidebarLinks(false);
    }
});

// ---------- Sidebar Link Animation ----------
function animateSidebarLinks(open) {
    sidebarLinks.forEach((link, index) => {
        link.style.transition = `opacity 0.25s ease ${index * 0.05}s, transform 0.25s ease ${index * 0.05}s`;
        if (open) {
            link.style.opacity = "1";
            link.style.transform = "translateY(0)";
        } else {
            link.style.opacity = "0";
            link.style.transform = "translateY(-10px)";
        }
    });
}

// ---------- Init Mobile State ----------
if (window.innerWidth <= 768) {
    sidebarLinks.forEach(link => {
        link.style.opacity = "0";
        link.style.transform = "translateY(-10px)";
    });
}

// ---------- Resize Handler ----------
window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        sidebar.classList.remove("open");
        hamburger.classList.remove("active");
        document.body.classList.remove("menu-open");
        document.documentElement.classList.remove("menu-open");
        unlockScroll();

        sidebarLinks.forEach(link => {
            link.style.opacity = "";
            link.style.transform = "";
        });
    }
});

// ---------- BACK TO TOP (NOW WORKS ON FIRST CLICK) ----------
window.addEventListener("scroll", () => {
    backToTop.classList.toggle("show", window.scrollY > 100);
});

backToTop.addEventListener("click", () => {
    // Ensure scroll is unlocked BEFORE scrolling to top
    document.body.style.position = '';
    document.body.style.top = '';

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
