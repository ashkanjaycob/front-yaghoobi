let savedScrollY = 0;

function lockScroll() {
  savedScrollY = window.scrollY;
  document.documentElement.classList.add('modal-open');
  document.body.classList.add('modal-open');
  document.body.style.top = `-${savedScrollY}px`;
}

function unlockScroll() {
  document.documentElement.classList.remove('modal-open');
  document.body.classList.remove('modal-open');
  document.body.style.top = '';
  window.scrollTo(0, savedScrollY);
}

export function openModal(post) {
  const modal = document.getElementById('post-modal');
  if (!modal || !post) return;

  const modalImage = document.getElementById('post-modal-image');
  const modalCategory = document.getElementById('post-modal-category');
  const modalTitle = document.getElementById('post-modal-title');
  const modalAuthor = document.getElementById('post-modal-author');
  const modalDate = document.getElementById('post-modal-date');
  const modalViews = document.getElementById('post-modal-views');
  const modalText = document.getElementById('post-modal-text');
  const windowEl = document.getElementById('post-modal-window');

  if (modalImage) {
    modalImage.src = post.img || '';
    modalImage.srcset = post.img_2x ? `${post.img} 1x, ${post.img_2x} 2x` : `${post.img} 1x`;
    modalImage.alt = post.title || '';
  }
  if (modalCategory) modalCategory.textContent = post.tags || '';
  if (modalTitle) modalTitle.textContent = post.title || '';
  if (modalAuthor) modalAuthor.textContent = post.autor || '';
  if (modalDate) modalDate.textContent = post.date || '';
  if (modalViews) modalViews.textContent = post.views ? `${post.views} Views` : '';
  if (modalText) modalText.textContent = post.text || '';

  modal.classList.remove('pointer-events-none', 'opacity-0');
  modal.classList.add('opacity-100');

  if (windowEl) {
    windowEl.classList.remove('scale-95', 'opacity-0');
    windowEl.classList.add('scale-100', 'opacity-100');
  }

  lockScroll();
}

export function closeModal() {
  const modal = document.getElementById('post-modal');
  if (!modal) return;

  modal.classList.remove('opacity-100');
  modal.classList.add('opacity-0', 'pointer-events-none');

  const windowEl = document.getElementById('post-modal-window');
  if (windowEl) {
    windowEl.classList.remove('scale-100', 'opacity-100');
    windowEl.classList.add('scale-95', 'opacity-0');
  }

  unlockScroll();
}


document.getElementById('post-modal-close-icon')?.addEventListener('click', closeModal);
document.getElementById('post-modal-backdrop')?.addEventListener('click', closeModal);
document.getElementById('post-modal-close-btn')?.addEventListener('click', closeModal);

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('post-modal');
    if (modal && !modal.classList.contains('opacity-0')) {
      closeModal();
    }
  }
});
