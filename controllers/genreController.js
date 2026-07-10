const prisma = require('../utils/prisma')

const getAllGenres = async (req , res , next)=>{
    try {
        const genres = await prisma.genre.findMany()
        res.json(genres)
    } catch (error) {
        next(error)
    }
}

const getGenreBySlug = async (req,res,next)=>{
    try {
        const {slug} = req.params
        const genre = await prisma.genre.findUnique({
            where : {slug}
        })
        if(!genre){
            res.status(404).json({
                message : "Genre Not Found"
            })
        }
        res.json(genre)
    } catch (error) {
        next(error)
    }
}

const createGenre = async (req,res,next)=>{
    try {
        const {name, slug, genreImage, description} = req.body
        const genre = await prisma.genre.findUnique({where:{slug}})
        if(genre){
            return res.status(409).json({
                message : "Genre Already Exists"
            })
        }
        const newGenre = await prisma.genre.create({
            data :{name,slug,description,genreImage}
        })
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
        const {name, slug, genreImage, description} = req.body
        const existingGenre = await prisma.genre.findUnique({where:{id}})
        if(!existingGenre){
            return res.status(404).json({
                message:"Genre not found"
            })
        }
        const genre = await prisma.genre.update({
            where:{id},
            data:{name, slug, genreImage, description}
        })
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
        const existingGenre = await prisma.genre.findUnique({where:{id}})
        if(!existingGenre){
            return res.status(404).json({
                message:"Genre not found"
            })
        }
        const deleteGenre = await prisma.genre.delete({where:{id}})
        res.status(200).json({
            message : "Genre Deleted Successfully",
            genre : deleteGenre
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