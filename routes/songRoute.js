const express = require("express");
const router = express.Router();

const {
    getAllSongs,
    getSongBySlug,
    createSong,
    updateSong,
    deleteSong
} = require("../controllers/songController");

router.get("/", getAllSongs);
router.get("/:slug", getSongBySlug);
router.post("/", createSong);
router.patch("/:id", updateSong);
router.delete("/:id", deleteSong);

module.exports = router;