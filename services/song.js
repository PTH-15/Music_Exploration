const prisma = require("../utils/prisma");

const getsongs = async () => {
    const songs = await prisma.song.findMany();
    return songs
}

const getasong = async (slug) => {
    const song = await prisma.song.findUnique({
            where: {
                slug
            }
        });

        if (!song) {
            throw new Error( "Song not found")
        }
        return song
}

const create = async (songdata) => {
    const {
            musicBrainzId,
            title,
            slug,
            coverImage,
            duration,
            trackNumber,
            releaseDate,
            artistId,
            albumId
        } = songdata
        const existingSong = await prisma.song.findUnique({
            where: {
                slug
            }
        });

        if (existingSong) {
            throw new Error("Song already exists")
            
        }
        const existingArtist = await prisma.artist.findUnique({where:{id:artistId}})
        if(!existingArtist){
            throw new Error("Artist not found")
            
        }
        const existingalbum = await prisma.album.findUnique({where:{id:albumId}})
        if(!existingalbum){throw new Error("Album not found..")}
        const song = await prisma.song.create({
            data: songdata
        });
        return song
}

const update = async (id, songdata) => {
    const {
            musicBrainzId,
            title,
            slug,
            coverImage,
            duration,
            trackNumber,
            releaseDate
        } = songdata

        const existingSong = await prisma.song.findUnique({
            where: {
                id
            }
        });

        if (!existingSong) {
            throw new Error("Song not found")

        }

        const song = await prisma.song.update({
            where: {
                id
            },
            data: songdata
        });
        return song
}

const deletesong = async (id) => {
    const existingSong = await prisma.song.findUnique({
            where: {
                id
            }
        });

        if (!existingSong) {
            throw new Error("Song not found")
        }

        const deletedSong = await prisma.song.delete({
            where: {
                id
            }
        });
        return deletedSong
}

module.exports={getsongs,getasong,create,update,deletesong}