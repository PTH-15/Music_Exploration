const prisma = require('../utils/prisma')


const getAllArtists = async (req,res, next)=>{
    try {
        const artists = await prisma.artist.findMany()
        res.json(artists)
    } catch (error) {
        next(error)
    }
}

const getArtistBySlug = async (req,res, next)=>{
    try {
        const {slug} = req.params
        const artist = await prisma.artist.findUnique({
            where :{
                slug
            }
        })
        if (!artist){
            return res.status(404).json({
                message:"Artist Not Found..."
            })
        }
        res.json(artist)
    } catch (error) {
        next(error)
    }
}


const createArtist = async (req,res, next)=>{
    try {
        const {slug, musicBrainzId, name, profileImage, bannerImage, country, type} = req.body
        const existingartist = await prisma.artist.findUnique({
            where:{
                slug
            }
        })
        if(existingartist){
            return res.status(409).json({
                message:"Artist already exists"
            })
        }
        const artist = await prisma.artist.create({
            data : {
                slug,
                musicBrainzId,
                name,
                type,
                country,
                profileImage,
                bannerImage
            }
        })
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
        const {name, country, profileImage, bannerImage, type} = req.body
        const existingartist = await prisma.artist.findUnique({
            where:{
                id
            }
        })
        if(!existingartist){
            return res.status(404).json({
                message:"Artist not found"
            })
        }
        const artist = await prisma.artist.update({
            where:{
                id
            },
            data:{
                name,
                country, 
                profileImage, 
                bannerImage, 
                type
            }
        })
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
        const existingartist = await prisma.artist.findUnique({
            where:{
                id
            }
        })
        if(!existingartist){
            return res.status(404).json({
                message:"Artist not found"
            })
        }
        const artist = await prisma.artist.delete({
            where:{id}
        })
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