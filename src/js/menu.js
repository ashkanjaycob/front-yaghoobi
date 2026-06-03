const backdrop = document.getElementById('mobile-backdrop');
const drawer = document.getElementById('mobile-drawer');

let savedScrollY = 0;

function lockPageScroll() {
  savedScrollY = window.scrollY;
  document.documentElement.classList.add('mobile-menu-open');
  document.body.classList.add('mobile-menu-open');
  document.body.style.top = `-${savedScrollY}px`;
}

function openMobileMenu() {
  drawer.classList.remove('-translate-x-full');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100', 'pointer-events-auto');
  lockPageScroll();
}

function closeMobileSubmenus() {
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
  closeMobileSubmenus();
  document.documentElement.classList.remove('mobile-menu-open');
  document.body.classList.remove('mobile-menu-open');
  document.body.style.top = '';
  window.scrollTo(0, savedScrollY);
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

const openBtn = document.getElementById('menu-open-btn');
const closeBtn = document.getElementById('menu-close-btn');

if (openBtn && closeBtn && backdrop) {
  openBtn.addEventListener('click', openMobileMenu);
  closeBtn.addEventListener('click', closeMobileMenu);
  backdrop.addEventListener('click', closeMobileMenu);
}

initMobileSubmenus();

const logoSection = document.getElementById('logo-container');
const navSection = document.getElementById('nav-container');

function initDesktopSubmenus() {
  if (!navSection) return;

  const menuItems = navSection.querySelectorAll('.menu-item');

  function closeDesktopSubmenu(item) {
    item.classList.remove('is-open');
    item.querySelector(':scope > a')?.setAttribute('aria-expanded', 'false');
  }

  function closeAllDesktopSubmenus(except) {
    menuItems.forEach((item) => {
      if (item !== except) closeDesktopSubmenu(item);
    });
  }

  function openDesktopSubmenu(item, focusFirstLink = false) {
    const trigger = item.querySelector(':scope > a');
    const submenu = item.querySelector('.submenu');
    if (!trigger || !submenu) return;

    closeAllDesktopSubmenus(item);
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');

    if (focusFirstLink) {
      submenu.querySelector('a')?.focus();
    }
  }

  menuItems.forEach((item) => {
    const trigger = item.querySelector(':scope > a');
    const submenu = item.querySelector('.submenu');
    if (!trigger || !submenu) return;

    trigger.querySelector('span')?.classList.add('menu-chevron');
    trigger.setAttribute('aria-haspopup', 'true');
    trigger.setAttribute('aria-expanded', 'false');

    trigger.addEventListener('focus', () => {
      if (isDesktopViewport()) openDesktopSubmenu(item);
    });

    trigger.addEventListener('keydown', (e) => {
      if (!isDesktopViewport()) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDesktopSubmenu(item, true);
      }

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (item.classList.contains('is-open')) {
          closeDesktopSubmenu(item);
        } else {
          openDesktopSubmenu(item);
        }
      }

      if (e.key === 'Escape') {
        e.preventDefault();
        closeDesktopSubmenu(item);
        trigger.focus();
      }
    });

    item.addEventListener('focusout', (e) => {
      if (!isDesktopViewport()) return;
      if (!item.contains(e.relatedTarget)) {
        closeDesktopSubmenu(item);
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!isDesktopViewport() || !navSection.contains(e.target)) {
      closeAllDesktopSubmenus();
    }
  });
}

initDesktopSubmenus();

const Desktop_Breakpoit = 1024;
const Scroll_Offset = 200;

let lastScrollY = window.scrollY;

function isDesktopViewport() {
  return window.innerWidth >= Desktop_Breakpoit;
}

function showDesktopNav() {
  navSection?.classList.remove('nav-hidden');
}

function handleDesktopNavScroll() {
  if (!logoSection || !navSection) return;

  if (!isDesktopViewport()) {
    showDesktopNav();
    lastScrollY = window.scrollY;
    return;
  }

  const scrollY = window.scrollY;
  const logoHeight = logoSection ? logoSection.offsetHeight : 0;

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
    navSection?.classList.add('nav-hidden');
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
