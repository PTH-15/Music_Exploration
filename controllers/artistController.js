const artistservice = require('../services/artist')


const getAllArtists = async (req,res, next)=>{
    try {
        const artists = await artistservice.allArtist()
        res.json(artists)
    } catch (error) {
        next(error)
    }
}

const getArtistBySlug = async (req,res, next)=>{
    try {
        const {slug} = req.params
        const artist = await artistservice.getaArtist(slug)
        res.json(artist)
    } catch (error) {
        next(error)
    }
}


const createArtist = async (req,res, next)=>{
    try {
        const artist = await artistservice.create(req.body)
        res.status(201).json({
            message : "Created artist successfully",
            artist
        })
    } catch (error) {
        next(error)
    }
}

const updateArtist = async (req,res, next)=>{
    try {
        const {id} = req.params
        const artist = await artistservice.update(id, req.body)
        res.status(200).json({
            message : "Updated artist successfully",
            artist
        })
    } catch (error) {
        next(error)
    }
}

const deleteArtist = async (req,res, next)=>{
    try {
        const {id} = req.params
        const artist = await artistservice.deleteArtist(id)
        res.status(200).json({
            message : "Deleted artist successfully",
            artist
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllArtists,
    getArtistBySlug,
    createArtist,
    updateArtist,
    deleteArtist
}