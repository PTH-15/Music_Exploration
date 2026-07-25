// song.js — client-side interactions only.
// Nothing here writes to a database; there are no Moment/Rating models yet.

document.addEventListener('DOMContentLoaded', () => {

  // --- Star rating (visual only until a Rating model + endpoint exist) ---
  const stars = document.querySelectorAll('#ratingStars .star');
  stars.forEach((star) => {
    star.addEventListener('click', () => {
      const value = Number(star.dataset.value);
      stars.forEach((s) => {
        s.classList.toggle('is-active', Number(s.dataset.value) <= value);
      });
      // TODO: once a Rating model + POST /api/songs/:id/rating endpoint exist,
      // send { value } here and update the average/count from the response.
    });
  });

  // --- Play preview button (wire up to real audio source once available) ---
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // TODO: no audio preview source on the Song model yet.
      console.log('Play preview requested — no audio source wired up yet.');
    });
  }

  // --- Add to playlist button (wire up once playlist add endpoint exists) ---
  const addPlaylistBtn = document.getElementById('addPlaylistBtn');
  if (addPlaylistBtn) {
    addPlaylistBtn.addEventListener('click', () => {
      // TODO: open a real "add to playlist" modal backed by the Playlist model.
      console.log('Add to playlist requested — modal not built yet.');
    });
  }

});