/* ===================================================
   BF·Regions — Script principal
   =================================================== */

/* ---- Navbar : scroll effect ---- */
window.addEventListener('scroll', () => {
  const topbar = document.querySelector('.topbar');
  if (topbar) {
    topbar.classList.toggle('scrolled', window.scrollY > 30);
  }
});

/* ---- Menu mobile ---- */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;
  menu.classList.toggle('open');

  // Animation hamburger → croix
  const spans = document.querySelectorAll('.hamburger span');
  const isOpen = menu.classList.contains('open');
  if (spans.length >= 3) {
    spans[0].style.transform = isOpen ? 'rotate(45deg) translate(5px, 5px)'  : '';
    spans[1].style.opacity   = isOpen ? '0' : '1';
    spans[2].style.transform = isOpen ? 'rotate(-45deg) translate(5px, -5px)' : '';
  }
}

/* Fermer le menu en cliquant sur un lien */
document.querySelectorAll('.mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    const menu = document.getElementById('mobileMenu');
    if (menu) menu.classList.remove('open');
    const spans = document.querySelectorAll('.hamburger span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

/* ---- Dropdown Régions (desktop) ---- */
function toggleDropdown() {
  const dd = document.getElementById('regionsDropdown');
  if (!dd) return;
  dd.classList.toggle('open');
}

document.addEventListener('click', (e) => {
  const dd = document.getElementById('regionsDropdown');
  if (dd && !dd.contains(e.target)) dd.classList.remove('open');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') document.getElementById('regionsDropdown')?.classList.remove('open');
});

/* ---- Dropdown Régions (mobile) ---- */
function toggleMobileRegions() {
  const btn  = document.getElementById('mobileRegionsBtn');
  const list = document.getElementById('mobileRegionsList');
  if (!btn || !list) return;
  const isOpen = list.classList.toggle('open');
  btn.classList.toggle('open', isOpen);
}

/* ---- Animations au scroll (fade-up) ---- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target); /* lance une seule fois */
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

/* ---- Lien actif dans la navbar ---- */
(function markActiveLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();


/* ===== SLIDER ===== */
(function initSlider() {
  const slider = document.querySelector(".slider");
  if (!slider) return;

  let index = 0;
  const images = slider.querySelectorAll(".slider-content img");
  const dotsContainer = slider.querySelector(".dots");

  // créer dots
  images.forEach((_, i) => {
    let dot = document.createElement("span");
    dot.addEventListener("click", () => showImage(i));
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  function showImage(i) {
    images[index].classList.remove("active");
    dots[index].classList.remove("active");

    index = i;

    images[index].classList.add("active");
    dots[index].classList.add("active");
  }

  // boutons
  slider.querySelector(".next").onclick = () => {
    showImage((index + 1) % images.length);
  };

  slider.querySelector(".prev").onclick = () => {
    showImage((index - 1 + images.length) % images.length);
  };

  // auto slide
  setInterval(() => {
    showImage((index + 1) % images.length);
  }, 5000);

  // init
  dots[0].classList.add("active");
})();