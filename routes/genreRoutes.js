const express = require('express')
const { getAllGenres, getGenreBySlug, createGenre, deleteGenre } = require('../controllers/genreController')
const { updateArtist } = require('../controllers/artistController')
const router = express.Router()

router.get("/",getAllGenres)
router.get('/:slug',getGenreBySlug)
router.post('/', createGenre)
router.patch('/:id',updateArtist)
router.delete("/:id", deleteGenre)
module.exports = router