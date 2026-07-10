const prisma = require('../utils/prisma')

const allAlbum = async (req, res, next) => {
    try {
        const albums = await prisma.album.findMany()
        res.json({ albums })
    } catch (error) {
        next(error)
    }
}
const getOneAlbum = async (req, res, next) => {
    try {
        const { slug } = req.params
        const existingAlbum = await prisma.album.findUnique({ where: { slug } })
        if (!existingAlbum) {
            return res.status(404).json({
                message: "Album Not Found..."
            })
        }
        res.json(existingAlbum)
    } catch (error) {
        next(error)
    }
}

const createAlbum = async (req, res, next) => {
    try {
        const {
            musicBrainzId,
            title,
            slug,
            coverImage,
            releaseDate,
            albumType,
            artistId } = req.body
        const existingalbum = await prisma.album.findUnique({
            where: {
                slug
            },
            include:{
                artists:true,
                songs:true,
                genres:true
            }
        })
        if (existingalbum) {
            return res.status(409).json({
                message: "Album already exists"
            })
        }
        const existingArist = await  prisma.artist.findUnique({
            where:{
                id:artistId
            }
        })
        if(!existingArist){
            return res.status(409).json({
                message: "Artist not found"
            })
        }
        const album = await prisma.album.create({
            data: {
                musicBrainzId,
                title,
                slug,
                coverImage,
                releaseDate:releaseDate ? new Date(releaseDate): null,
                albumType,
                artists:{
                    connect:[{id:artistId}]
                }
            }
        })
        res.status(201).json({
            message: "Created Album successfully",
            album
        })
    } catch (error) {
        next(error)
    }
}

const updateAlbum = async (req,res, next)=>{
    try {
        const {id} = req.params
        const {musicBrainzId, slug, title, coverImage, releaseDate, albumType} = req.body
        const existingAlbum = await prisma.album.findUnique({
            where:{
                id
            }
        })
        if(!existingAlbum){
            return res.status(404).json({
                message:"Album not found"
            })
        }
        const album = await prisma.album.update({
            where:{
                id
            },
            data:{
                musicBrainzId, title, coverImage, releaseDate, albumType, slug
            }
        })
        res.status(200).json({
            message : "Updated Album successfully",
            album
        })
    } catch (error) {
        next(error)
    }
}

const deleteAlbum = async (req,res, next)=>{
    try {
        const {id} = req.params
        const existingAlbum = await prisma.album.findUnique({
            where:{
                id
            }
        })
        if(!existingAlbum){
            return res.status(404).json({
                message:"Album not found"
            })
        }
        const artist = await prisma.album.delete({
            where:{id}
        })
        res.status(200).json({
            message : "Deleted album successfully",
            artist
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