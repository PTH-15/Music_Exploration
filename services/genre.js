const prisma = require('../utils/prisma')

const getGenre = async ()=>{
    const genres = await prisma.genre.findMany()
    return genres
}

const getaGenre = async (slug)=>{
    const genre = await prisma.genre.findUnique({
        where : {slug}
    })
    if(!genre){
        throw new Error("Genre Not Found")
    }
    return genre

}

const create = async (genredata) => {
    const {name, slug, genreImage, description} = genredata
    const genre = await prisma.genre.findUnique({where:{slug}})
    if(genre){
        throw new Error("Genre Already Exists")
    }
    const newGenre = await prisma.genre.create({
        data :genredata
    })
    return newGenre
}

const update = async (id , genredata) => {
    const {name, slug, genreImage, description} = genredata
    const existingGenre = await prisma.genre.findUnique({where:{id}})
    if(!existingGenre){
        throw new Error("Genre not found")
    }
    const genre = await prisma.genre.update({
        where:{id},
        data:genredata
    })
    return genre
}

const deletegenre = async (id)=>{
     const existingGenre = await prisma.genre.findUnique({where:{id}})
        if(!existingGenre){
            throw new Error("Genre not found")
            
        }
        const deletedGenre = await prisma.genre.delete({where:{id}})
        return deletedGenre
}

module.exports={getGenre,getaGenre,create,update,deletegenre}