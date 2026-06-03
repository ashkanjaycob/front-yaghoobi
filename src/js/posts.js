import { openModal } from './modal.js';

const grid = document.getElementById('posts-grid');

let loadedPosts = [];

const getPosts = async () => {
  try {
    const response = await fetch(
      'https://cloud.codesupply.co/endpoint/react/data.json'
    );
    if (!response.ok) throw new Error('Could not fetch data');
    const posts = await response.json();
    loadedPosts = posts;

    if (!grid) return;

    grid.innerHTML = posts
      .map(
        (post, index) => `
      <article class="post-card" data-index="${index}">
        <img
          src="${post.img}"
          srcset="${post.img} 1x, ${post.img_2x} 2x"
          alt="${post.title}"
          class="post-card-img"
        />
        <p class="post-card-category">${post.tags}</p>
        <h2 class="post-card-title">${post.title}</h2>
        <span class="flex"> 
        <p class="post-card-author">${post.autor}</p>
        <ol class="post-card-statics">
          <li>${post.date}</li>
          <li>${post.views} Views</li>
        </ol>
        </span>
        <p class="post-card-text">${post.text}</p>
      </article>
    `
      )
      .join('');
  } catch (error) {
    console.error(error, 'There is an issue !');
  }
};

if (grid) {
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.post-card');
    if (card) {
      const index = card.getAttribute('data-index');
      const post = loadedPosts[index];
      if (post) {
        openModal(post);
      }
    }
  });
}

getPosts();
