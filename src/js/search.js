import { loadedPosts, displayPosts } from './posts.js';

const searchBar = document.getElementById('search-bar');
const searchInput = document.getElementById('search-input');
const searchLoader = document.getElementById('search-loader');
const searchCloseBtn = document.getElementById('search-close-btn');
const searchEmpty = document.getElementById('search-empty');
const searchIcon = document.getElementById('search-icon');

const desktopSearchBtn = document.getElementById('desktop-search-btn');
const mobileSearchBtn = document.getElementById('mobile-search-btn');

let searchTimeout = null;


function hideSearchBar() {
  if (!searchBar) return;
  searchBar.classList.add('hidden');
  if (searchInput) {
    searchInput.value = '';
  }
  searchLoader?.classList.add('hidden');
  searchIcon?.classList.remove('hidden');
  searchEmpty?.classList.add('hidden');
  displayPosts(loadedPosts);
}

function liveSearch() {
  const query = searchInput ? searchInput.value.toLowerCase().trim() : '';

  if (query === '') {
    displayPosts(loadedPosts);
    searchLoader?.classList.add('hidden');
    searchEmpty?.classList.add('hidden');
    searchIcon?.classList.remove('hidden');
    return;
  }

  const filtered = loadedPosts.filter(
    (post) =>
      (post.title && post.title.toLowerCase().includes(query)) ||
      (post.text && post.text.toLowerCase().includes(query)) ||
      (post.tags && post.tags.toLowerCase().includes(query))
  );

  displayPosts(filtered);
  searchLoader?.classList.add('hidden');
  searchIcon?.classList.remove('hidden');

  if (filtered.length === 0) {
    searchEmpty?.classList.remove('hidden');
  } else {
    searchEmpty?.classList.add('hidden');
  }
}

desktopSearchBtn?.addEventListener('click', () => {
  if (!searchBar) return;
  searchBar.classList.remove('hidden');
  searchInput?.focus();
});
mobileSearchBtn?.addEventListener('click', () => {
  if (!searchBar) return;
  searchBar.classList.remove('hidden');
  searchInput?.focus();
});
searchCloseBtn?.addEventListener('click', hideSearchBar);

searchInput?.addEventListener('input', () => {
  searchLoader?.classList.remove('hidden');
  searchIcon?.classList.add('hidden');

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    liveSearch();
  }, 300);
});
