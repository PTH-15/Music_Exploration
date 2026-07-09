// ---------- Sample data ----------
// Replace this array with a fetch() call to your backend once you have
// a real route, e.g.:
//
// let ARTISTS = [];
// fetch('/api/artists').then(r => r.json()).then(data => {
//   ARTISTS = data;
//   applyFilters();
// });

const ARTISTS = [
  { name: "Kr$na",        genre: "hip-hop",  albums: 45, songs: 120, gradient: "linear-gradient(160deg,#3a2a1e,#12100e)" },
  { name: "Seedhe Maut",  genre: "hip-hop",  albums: 30, songs: 88,  gradient: "linear-gradient(160deg,#2a2320,#0f0d0c)" },
  { name: "Raga",         genre: "indie",    albums: 25, songs: 64,  gradient: "linear-gradient(160deg,#241d2e,#0e0c12)" },
  { name: "Karma",        genre: "hip-hop",  albums: 60, songs: 250, gradient: "linear-gradient(160deg,#2c1720,#100a0d)" },
  { name: "King",         genre: "pop",      albums: 20, songs: 70,  gradient: "linear-gradient(160deg,#1e2622,#0b0f0d)" },
  { name: "Bhaskar",      genre: "lo-fi",    albums: 35, songs: 120, gradient: "linear-gradient(160deg,#242020,#0d0b0b)" },
  { name: "Rafatar",      genre: "hip-hop",  albums: 35, songs: 120, gradient: "linear-gradient(160deg,#242020,#0d0b0b)" },
  { name: "Weekend",      genre: "pop",      albums: 35, songs: 120, gradient: "linear-gradient(160deg,#242020,#0d0b0b)" },
  { name: "Talha Yunus",  genre: "punjabi",  albums: 35, songs: 120, gradient: "linear-gradient(160deg,#242020,#0d0b0b)" },
  { name: "Encore ABJ",   genre: "rnb",      albums: 35, songs: 120, gradient: "linear-gradient(160deg,#242020,#0d0b0b)" },
  { name: "Lana Dey Rey", genre: "pop",      albums: 12, songs: 55,  gradient: "linear-gradient(160deg,#3a2a1e,#12100e)" },
  { name: "Prateek Kuhad",genre: "indie",    albums: 8,  songs: 40,  gradient: "linear-gradient(160deg,#241d2e,#0e0c12)" }
];

// ---------- State ----------
let state = {
  query: "",
  genre: "all",
  sort: "trending",
  visibleCount: 8
};

const PAGE_SIZE = 8;

// ---------- Elements ----------
const artistGrid   = document.getElementById('artistGrid');
const resultCount  = document.getElementById('resultCount');
const emptyState   = document.getElementById('emptyState');
const loadMoreBtn  = document.getElementById('loadMoreBtn');
const genreFilters = document.getElementById('genreFilters');
const sortSelect   = document.getElementById('sortSelect');
const artistSearchInput = document.getElementById('artistSearchInput');
const navSearchInput    = document.getElementById('searchInput');

// ---------- Render ----------
function getFilteredArtists() {
  let list = ARTISTS.filter(a => {
    const matchesQuery = !state.query || a.name.toLowerCase().includes(state.query);
    const matchesGenre = state.genre === 'all' || a.genre === state.genre;
    return matchesQuery && matchesGenre;
  });

  if (state.sort === 'az') {
    list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
  } else if (state.sort === 'albums') {
    list = list.slice().sort((a, b) => b.albums - a.albums);
  } else if (state.sort === 'songs') {
    list = list.slice().sort((a, b) => b.songs - a.songs);
  }
  // 'trending' just keeps original order

  return list;
}

function renderCard(artist) {
  const card = document.createElement('a');
  card.href = '';
  card.className = 'explore-artist-card';
  card.style.setProperty('--img', artist.gradient);
  card.innerHTML = `
    <span class="artist-genre-tag">${artist.genre.replace('-', ' ')}</span>
    <span class="artist-name">${artist.name}</span>
    <span class="artist-meta">${artist.albums} Albums · ${artist.songs} Songs</span>
  `;
  return card;
}

function render() {
  const filtered = getFilteredArtists();
  const visible = filtered.slice(0, state.visibleCount);

  artistGrid.innerHTML = '';
  visible.forEach(artist => artistGrid.appendChild(renderCard(artist)));

  resultCount.textContent = filtered.length;
  emptyState.hidden = filtered.length !== 0;
  artistGrid.hidden = filtered.length === 0;
  loadMoreBtn.hidden = state.visibleCount >= filtered.length;
}

// ---------- Event wiring ----------
if (artistSearchInput) {
  artistSearchInput.addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    state.visibleCount = PAGE_SIZE;
    render();
  });
}

// Keep navbar search in sync with the page search on this specific page
if (navSearchInput) {
  navSearchInput.addEventListener('input', (e) => {
    state.query = e.target.value.trim().toLowerCase();
    state.visibleCount = PAGE_SIZE;
    if (artistSearchInput) artistSearchInput.value = e.target.value;
    render();
  });
}

if (genreFilters) {
  genreFilters.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      genreFilters.querySelectorAll('.chip').forEach(c => c.classList.remove('is-active'));
      chip.classList.add('is-active');
      state.genre = chip.dataset.genre;
      state.visibleCount = PAGE_SIZE;
      render();
    });
  });
}

if (sortSelect) {
  sortSelect.addEventListener('change', (e) => {
    state.sort = e.target.value;
    render();
  });
}

if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    state.visibleCount += PAGE_SIZE;
    render();
  });
}

// ---------- Init ----------
render();