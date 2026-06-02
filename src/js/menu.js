const openBtn = document.getElementById('menu-open-btn');
const closeBtn = document.getElementById('menu-close-btn');
const backdrop = document.getElementById('mobile-backdrop');
const drawer = document.getElementById('mobile-drawer');

let savedScrollY = 0;

function lockPageScroll() {
  savedScrollY = window.scrollY;
  document.documentElement.classList.add('mobile-menu-open');
  document.body.classList.add('mobile-menu-open');
  document.body.style.top = `-${savedScrollY}px`;
}

function unlockPageScroll() {
  document.documentElement.classList.remove('mobile-menu-open');
  document.body.classList.remove('mobile-menu-open');
  document.body.style.top = '';
  window.scrollTo(0, savedScrollY);
}

function openMobileMenu() {
  drawer.classList.remove('-translate-x-full');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100', 'pointer-events-auto');
  lockPageScroll();
}

function closeAllMobileSubmenus() {
  if (!drawer) return;

  drawer.querySelectorAll('.mobile-menu-item.is-open').forEach((item) => {
    item.classList.remove('is-open');
    item
      .querySelector('.mobile-menu-toggle')
      ?.setAttribute('aria-expanded', 'false');
  });
}

function closeMobileMenu() {
  drawer.classList.add('-translate-x-full');
  backdrop.classList.remove('opacity-100', 'pointer-events-auto');
  backdrop.classList.add('opacity-0', 'pointer-events-none');
  closeAllMobileSubmenus();
  unlockPageScroll();
}

function initMobileSubmenus() {
  if (!drawer) return;

  drawer.querySelectorAll('.mobile-menu-item').forEach((item) => {
    const toggle = item.querySelector('.mobile-menu-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  });
}

if (openBtn && closeBtn && backdrop) {
  openBtn.addEventListener('click', openMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);
}

initMobileSubmenus();

const logoSection = document.getElementById('logo-container');
const navSection = document.getElementById('nav-container');

const Desktop_Breakpoit = 1024;
const Scroll_Offset = 200;

let lastScrollY = window.scrollY;

function isDesktopViewport() {
  return window.innerWidth >= Desktop_Breakpoit;
}

function getLogoSectionHeight() {
  return logoSection ? logoSection.offsetHeight : 0;
}

function showDesktopNav() {
  navSection?.classList.remove('nav-hidden');
}

function hideDesktopNav() {
  navSection?.classList.add('nav-hidden');
}

function handleDesktopNavScroll() {
  if (!logoSection || !navSection) return;

  if (!isDesktopViewport()) {
    showDesktopNav();
    lastScrollY = window.scrollY;
    return;
  }

  const scrollY = window.scrollY;
  const logoHeight = getLogoSectionHeight();

  if (scrollY <= logoHeight) {
    showDesktopNav();
    lastScrollY = scrollY;
    return;
  }

  if (scrollY < lastScrollY) {
    showDesktopNav();
    lastScrollY = scrollY;
    return;
  }

  if (scrollY >= logoHeight + Scroll_Offset) {
    hideDesktopNav();
  }

  lastScrollY = scrollY;
}

if (logoSection && navSection) {
  window.addEventListener('scroll', handleDesktopNavScroll, { passive: true });
  window.addEventListener('resize', () => {
    if (!isDesktopViewport()) showDesktopNav();
    lastScrollY = window.scrollY;
    handleDesktopNavScroll();
  });
}
