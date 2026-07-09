// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// Trending artists carousel
const carousel = document.getElementById('artistCarousel');
const nextBtn = document.getElementById('carouselNext');
if (carousel && nextBtn) {
  nextBtn.addEventListener('click', () => {
    const cardWidth = carousel.querySelector('.artist-card')?.offsetWidth || 190;
    carousel.scrollBy({ left: cardWidth + 18, behavior: 'smooth' });
  });
}

// Simple search filter (matches artist names + genre chips)
// Wired to both the navbar search and the in-page "Search TuneVault" panel
function filterContent(query) {
  const q = query.trim().toLowerCase();

  document.querySelectorAll('.artist-card').forEach(card => {
    const name = card.querySelector('.artist-name')?.textContent.toLowerCase() || '';
    card.style.display = !q || name.includes(q) ? '' : 'none';
  });

  document.querySelectorAll('.genre-chip').forEach(chip => {
    const label = chip.textContent.toLowerCase();
    chip.style.display = !q || label.includes(q) ? '' : 'none';
  });
}

const searchInput = document.getElementById('searchInput');
const pageSearchInput = document.getElementById('pageSearchInput');

if (searchInput) {
  searchInput.addEventListener('input', (e) => filterContent(e.target.value));
}
if (pageSearchInput) {
  pageSearchInput.addEventListener('input', (e) => filterContent(e.target.value));
}

// Search panel filter chips (All / Artists / Albums / Songs / Playlists)
const searchChips = document.querySelectorAll('.search-chips .chip');
searchChips.forEach(chip => {
  chip.addEventListener('click', () => {
    searchChips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
  });
});

// Animated stat counters (Discover sidebar) using IntersectionObserver
const statEls = document.querySelectorAll('.stats-item strong[data-count]');
const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(num % 1000000 === 0 ? 0 : 1) + 'M+';
  if (num >= 1000) return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'K+';
  return num + '+';
};

const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatNumber(Math.floor(target * eased));
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = formatNumber(target);
  };
  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window && statEls.length) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  statEls.forEach(el => observer.observe(el));
} else {
  statEls.forEach(el => animateCount(el));
}