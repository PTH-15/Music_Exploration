const express = require("express");
const router = express.Router();
const { renderDashboard,renderArtists,renderCreateArtistForm, renderArtistSearch, searchArtist } = require("../controllers/adminController");

router.get("/", renderDashboard);
router.get("/artists", renderArtists);
router.get("/artists/new", renderCreateArtistForm);
router.get("/artists/search", renderArtistSearch);
router.get("/artists/search/results",searchArtist);
module.exports = router;