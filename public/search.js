// search.js — filters the already server-rendered result groups.
// No fake/mock data here; everything shown came from the Prisma query in app.js.

document.addEventListener('DOMContentLoaded', () => {
  const chips = document.querySelectorAll('#filterChips .chip');
  const groups = document.querySelectorAll('.result-group');

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('is-active'));
      chip.classList.add('is-active');

      const filter = chip.dataset.filter;

      groups.forEach((group) => {
        const matches = filter === 'all' || group.dataset.group === filter;
        const hasResults = group.querySelector('.result-grid, .result-list')
          ?.children.length > 0;
        group.style.display = matches && hasResults ? '' : 'none';
      });
    });
  });
});