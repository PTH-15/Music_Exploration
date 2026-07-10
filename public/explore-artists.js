// ---------- Sample data ----------
// Replace this array with a fetch() call to your backend once you have
// a real route, e.g.:
//
// let ARTISTS = [];
// fetch('/api/artists').then(r => r.json()).then(data => {
//   ARTISTS = data;
//   applyFilters();
// });

let ARTISTS = [];

async function loadArtists() {
    try {
        const response = await fetch("/api/artists");
        console.log(response);
        
        ARTISTS = await response.json();
        console.log(Array.isArray(ARTISTS));
        
        console.log(ARTISTS);
        
        render();
    } catch (error) {
        console.error(error);
    }
}
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
        return !state.query || a.name.toLowerCase().includes(state.query);
    });

    if (state.sort === "az") {
        list = list.slice().sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
}

function renderCard(artist) {

    const card = document.createElement("a");

    card.href = `/artist/${artist.slug}`;

    card.className = "explore-artist-card";

    card.innerHTML = `
        <div class="artist-image">
            <img src="${artist.profileImage}" alt="${artist.name}">
        </div>

        <span class="artist-name">${artist.name}</span>

        <span class="artist-meta">
            ${artist.country || "Unknown"} • ${artist.type}
        </span>
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
loadArtists();