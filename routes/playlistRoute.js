const express = require("express");
const router = express.Router();

const {
    getAllPlaylists,
    getPlaylistBySlug,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
} = require("../controllers/playlistController");

router.get("/", getAllPlaylists);
router.get("/:slug", getPlaylistBySlug);
router.post("/", createPlaylist);
router.patch("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

module.exports = router;