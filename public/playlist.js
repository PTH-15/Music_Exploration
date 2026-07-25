
document.addEventListener('DOMContentLoaded', () => {
  const playAllBtn = document.getElementById('playAllBtn');
  if (playAllBtn) {
    playAllBtn.addEventListener('click', () => {
      // TODO: no audio source on Song model yet — wire this up once that exists.
      console.log('Play All requested — no audio source wired up yet.');
    });
  }
});