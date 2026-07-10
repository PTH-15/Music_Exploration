const express = require('express')
const { allAlbum, getOneAlbum, createAlbum, updateAlbum, deleteAlbum } = require('../controllers/albumController')
const router = express.Router()

router.get('/',allAlbum)
router.get('/:slug',getOneAlbum)
router.post('/',createAlbum)
router.patch('/:id',updateAlbum)
router.delete('/:id',deleteAlbum)

module.exports = router