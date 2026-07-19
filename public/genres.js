// genres.js

// Hardcoded for now — once you have GET /api/genres wired up via Prisma,
// replace this array with a fetch() call and keep the render/filter logic below.
const GENRES = [
  { name: 'Hip-Hop', slug: 'hip-hop', icon: '🎤', tone: 'a', artistCount: 128, trendingRank: 1 },
  { name: 'Pop', slug: 'pop', icon: '⭐', tone: 'b', artistCount: 96, trendingRank: 3 },
  { name: 'Punjabi', slug: 'punjabi', icon: '📡', tone: 'c', artistCount: 54, trendingRank: 5 },
  { name: 'Rock', slug: 'rock', icon: '🎸', tone: 'd', artistCount: 87, trendingRank: 6 },
  { name: 'Lo-fi', slug: 'lo-fi', icon: '🎧', tone: 'e', artistCount: 41, trendingRank: 2 },
  { name: 'R&B', slug: 'rnb', icon: '❤', tone: 'f', artistCount: 63, trendingRank: 4 },
  { name: 'Classical', slug: 'classical', icon: '🎻', tone: 'g', artistCount: 29, trendingRank: 8 },
  { name: 'Indie', slug: 'indie', icon: '🎶', tone: 'h', artistCount: 72, trendingRank: 7 },
];

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('genreListGrid');
  const emptyState = document.getElementById('genreEmptyState');
  const resultCount = document.getElementById('genreResultCount');
  const searchInput = document.getElementById('genreSearchInput');
  const sortSelect = document.getElementById('genreSortSelect');

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const sortBy = sortSelect.value;

    let filtered = GENRES.filter((g) => g.name.toLowerCase().includes(query));

    if (sortBy === 'az') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'artists') {
      filtered.sort((a, b) => b.artistCount - a.artistCount);
    } else {
      filtered.sort((a, b) => a.trendingRank - b.trendingRank);
    }

    grid.innerHTML = '';

    if (filtered.length === 0) {
      emptyState.hidden = false;
    } else {
      emptyState.hidden = true;
      filtered.forEach((genre) => {
        const card = document.createElement('a');
        card.href = `/genre/${genre.slug}`;
        card.className = 'genre-list-card';
        card.setAttribute('data-tone', genre.tone);
        card.innerHTML = `
          <span class="genre-list-icon">${genre.icon}</span>
          <span class="genre-list-name">${genre.name}</span>
          <span class="genre-list-meta">${genre.artistCount} Artists</span>
        `;
        grid.appendChild(card);
      });
    }

    resultCount.textContent = filtered.length;
  }

  searchInput.addEventListener('input', render);
  sortSelect.addEventListener('change', render);

  render();
});