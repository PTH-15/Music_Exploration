const express = require("express");
const router = express.Router();
const { renderDashboard,renderArtists,updateArtist,renderCreateArtistForm, deleteArtist, renderEditArtistForm, renderArtistSearch, searchArtist, createArtist, renderGenre, renderAlbum, renderSong } = require("../controllers/adminController");

router.get("/", renderDashboard);
router.get("/artists", renderArtists);
router.get("/artists/new", renderCreateArtistForm);
router.get("/artists/search", renderArtistSearch);
router.get("/artists/search/results",searchArtist);
router.post("/artists", createArtist);
router.get("/artists", renderArtists);
router.get("/artists/:id/edit", renderEditArtistForm);
router.post("/artists/:id", updateArtist);
router.post("/artists/:id/delete", deleteArtist);
router.get("/genres", renderGenre);
router.get("/albums", renderAlbum);
router.get("/songs", renderSong);

module.exports = router;