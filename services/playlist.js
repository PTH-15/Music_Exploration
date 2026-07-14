const prisma = require("../utils/prisma");

const getPlaylists = async () => {
    const playlists = await prisma.playlist.findMany();
}

const getaplaylist = async (slug) => {
    const playlist = await prisma.playlist.findUnique({
            where: {
                slug
            }
        });

        if (!playlist) {
            throw new Error("Playlist not found")
        }
        return playlist
}

const create = async (playlistdata) => {
    const {
            title,
            slug,
            description,
            coverImage,
            creatorId,
            visibility
        } = playlistdata
     const existingPlaylist = await prisma.playlist.findUnique({
            where: {
                slug
            }
        });

        if (existingPlaylist) {
            throw new Error("Playlist already exists")
        }

        const playlist = await prisma.playlist.create({
            data: playlistdata
        });
        return playlist
}

const update = async (id, playlistdata) => {
     const {
            title,
            slug,
            description,
            coverImage,
            visibility
        } = playlistdata

        const existingPlaylist = await prisma.playlist.findUnique({
            where: {
                id
            }
        });

        if (!existingPlaylist) {
            throw new Error("Playlist not found")
        }

        const playlist = await prisma.playlist.update({
            where: {
                id
            },
            data: playlistdata
        });
        return playlist

}

const deletePlaylist = async (id) => {
    const existingPlaylist = await prisma.playlist.findUnique({
            where: {
                id
            }
        });

        if (!existingPlaylist) {
            throw new Error("Playlist not found")
        }

        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id
            }
        });
        return deletedPlaylist
}

module.exports={getPlaylists,getaplaylist,create,update,deletePlaylist}