// const prisma = require('../utils/prisma')
const genreservice = require('../services/genre')
const getAllGenres = async (req , res , next)=>{
    try {
        const genres = await genreservice.getGenre()
        res.json(genres)
    } catch (error) {
        next(error)
    }
}

const getGenreBySlug = async (req,res,next)=>{
    try {
        const {slug} = req.params
        const genre = await genreservice.getaGenre(slug)
        res.json(genre)
    } catch (error) {
        next(error)
    }
}

const createGenre = async (req,res,next)=>{
    try {
        const newGenre = await genreservice.create(req.body)
        res.status(201).json({
            message : "Created genre successfully",
            genre : newGenre
        })
    } catch (error) {
        next(error)
    }
}

const updateGenre = async (req,res,next)=>{
    try {
        const {id} = req.params
        
        const genre = await genreservice.update(id, req.body)
        res.status(200).json({
            message : "Updated Genre successfully",
            genre
        })
    } catch (error) {
        next(error)
    }
}

const deleteGenre = async (req,res,next)=>{
    try {
        const {id} = req.params
       const deletedGenre = await genreservice.deletegenre(id)
        res.status(200).json({
            message : "Genre Deleted Successfully",
            genre : deletedGenre
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllGenres,
    getGenreBySlug,
    createGenre,
    updateGenre,
    deleteGenre
}