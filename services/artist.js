const prisma = require('../utils/prisma')

const allArtist = async () => {
    const artists = await prisma.artist.findMany()
    return artists
} 

const getaArtist = async (slug) => {
    const artist = await prisma.artist.findUnique({
            where :{
                slug
            }
        })
        if(!artist){
        throw new Error("Artist Not Found...")}
        return artist
}

const create = async (artistdata) => {
    const {slug, musicBrainzId, name, profileImage, bannerImage, country, type} = artistdata
        const existingartist = await prisma.artist.findUnique({
            where:{
                slug
            }
        })
        if(existingartist){
            throw new Error("Artist already exists")
        }
        const artist = await prisma.artist.create({
            data : artistdata
        })
        return artist
}

const update = async (id , artistdata)=>{
    const {name, country, profileImage, bannerImage, type} = artistdata
        const existingartist = await prisma.artist.findUnique({
            where:{
                id
            }
        })
        if(!existingartist){
            throw new Error("Artist Not Found...")}
        
        const artist = await prisma.artist.update({
            where:{
                id
            },
            data:artistdata
        })

        return artist
}

const deleteArtist = async (id)=>{
    const existingartist = await prisma.artist.findUnique({
            where:{
                id
            }
        })
        if(!existingartist){
            throw new Error("Artist Not Found...")}
        
        const artist = await prisma.artist.delete({
            where:{id}
        })
        return artist
}

module.exports={allArtist,getaArtist,create,update,deleteArtist}