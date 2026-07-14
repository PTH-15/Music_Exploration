const prisma = require('../utils/prisma')

const allAlbum = async () =>{
    const albums = await prisma.album.findMany()
    return albums
}

const getoneAlbum = async (slug)=>{
    const existingAlbum = await prisma.album.findUnique({ where: { slug } })
        if (!existingAlbum) {
            throw new Error("Album Not Found...")
        }
        return existingAlbum
}

const create = async ( albumdata)=>{
    const {musicBrainzId,
                title,
                slug,
                coverImage,
                releaseDate,
                albumType,
                artistId} = albumData
    const existingalbum = await prisma.album.findUnique({
            where: {
                slug
            }
        })
        if (existingalbum) {
            throw new Error("Album already exists")
        }
        const existingArtist = await  prisma.artist.findUnique({
            where:{
                id:artistId
            }
        })
        if(!existingArtist){
        
            throw new Error("Artist not found")
        }
        const album = await prisma.album.create({
            data: {
                musicBrainzId,
                title,
                slug,
                coverImage,
                releaseDate:releaseDate ? new Date(releaseDate): null,
                albumType,
                artistId:{
                    connect:[{id:artistId}]
                }
            }
        })
        return album
}

const deleteAlbum = async (id)=>{
     const existingAlbum = await prisma.album.findUnique({
            where:{
                id
            }
        })
        if(!existingAlbum){
            throw new Error("Album not found")
        }
        const deletedAlbum = await prisma.album.delete({
            where:{id}
        })
        return deletedAlbum
}

const updateAlbum = async (id , albumData) =>{
    const {musicBrainzId,
                title,
                slug,
                coverImage,
                releaseDate,
                albumType,
                artistId} = albumData
            const existingAlbum = await prisma.album.findUnique({
                    where:{
                        id
                    }
                })

            if(!existingAlbum){
                throw new Error("Album not found")
            }
            const updatedAlbum = await prisma.album.update({
                where:{
                    id
                },
                data:albumData
                
            })
            return updatedAlbum
}


module.exports = {
    deleteAlbum,
    updateAlbum,
    allAlbum,
    getoneAlbum,
    create
}