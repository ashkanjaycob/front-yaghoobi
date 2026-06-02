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
