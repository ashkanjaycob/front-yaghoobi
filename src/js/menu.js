const openBtn = document.getElementById('menu-open-btn');
const closeBtn = document.getElementById('menu-close-btn');
const backdrop = document.getElementById('mobile-backdrop');
const drawer = document.getElementById('mobile-drawer');

function openMobileMenu() {
  drawer.classList.remove('-translate-x-full');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100', 'pointer-events-auto');
}

function closeMobileMenu() {
  drawer.classList.add('-translate-x-full');
  backdrop.classList.remove('opacity-100', 'pointer-events-auto');
  backdrop.classList.add('opacity-0', 'pointer-events-none');
}

if (openBtn && closeBtn && backdrop) {
  openBtn.addEventListener('click', openMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);
}

const logoContainer = document.getElementById('logo-container');
const navContainer = document.getElementById('nav-container');

let lastScrollY = window.scrollY;
let scrollTriggerPoint = 0;
let isNavHidden = false;

window.addEventListener('scroll', () => {
  if (window.innerWidth < 1024) return;

  const currentScrollY = window.scrollY;
  const logoHeight = logoContainer ? logoContainer.offsetHeight : 0;

  if (currentScrollY > lastScrollY) {
    if (currentScrollY > logoHeight) {
      if (!isNavHidden) {
        if (scrollTriggerPoint === 0) {
          scrollTriggerPoint = currentScrollY;
        }

        if (currentScrollY - scrollTriggerPoint > 200) {
          navContainer.classList.add('nav-hidden');
          isNavHidden = true;
        }
      }
    }
  } else {
    scrollTriggerPoint = 0;

    if (isNavHidden) {
      navContainer.classList.remove('nav-hidden');
      isNavHidden = false;
    }
  }

  if (currentScrollY <= logoHeight) {
    navContainer.classList.remove('nav-hidden');
    isNavHidden = false;
    scrollTriggerPoint = 0;
  }

  lastScrollY = currentScrollY;
});
