const express = require('express')
const router = express.Router()
const {getAllArtists,getArtistBySlug, createArtist, updateArtist, deleteArtist} = require('../controllers/artistController')

router.get("/", getAllArtists)
router.get("/:slug", getArtistBySlug)
router.post("/",createArtist)
router.patch("/:id",updateArtist)
router.delete("/:id",deleteArtist)
module.exports = router