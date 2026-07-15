// const prisma = require('../utils/prisma')
const albumServices = require('../services/album')

const allAlbum = async (req, res, next) => {
    try {
        const albums = await albumServices.allAlbum()
        res.json({ albums })
    } catch (error) {
        next(error)
    }
}
const getOneAlbum = async (req, res, next) => {
    try {
        const { slug } = req.params
        const existingAlbum = await albumServices.getoneAlbum(slug)
        res.json(existingAlbum)
    } catch (error) {
        next(error)
    }
}

const createAlbum = async (req, res, next) => {
    try {

        const createdAlbum = await albumServices.create(req.body)
        
        res.status(201).json({
            message: "Created Album successfully",
            album:createdAlbum
        })
    } catch (error) {
        next(error)
    }
}

const updateAlbum = async (req,res, next)=>{
    try {
        const {id} = req.params
        const updatedAlbum = await albumServices.updateAlbum(id, req.body) //{musicBrainzId, slug, title, coverImage, releaseDate, albumType} = req.body
        res.status(200).json({
            message : "Updated Album successfully",
            album:updatedAlbum
        })
    } catch (error) {
        next(error)
    }
}

const deleteAlbum = async (req,res, next)=>{
    try {
        const {id} = req.params
        const deletedAlbum = await albumServices.deleteAlbum(id)
        res.status(200).json({
            message : "Deleted album successfully",
            album: deletedAlbum
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    allAlbum,
    getOneAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum
}