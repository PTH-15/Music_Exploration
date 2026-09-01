const prisma = require("../utils/prisma");

const allAlbum = async () => {

    const albums = await prisma.album.findMany({
        include: {
            artists: true,
            genres: true
        }
    });

    return albums;
};


const getoneAlbum = async (slug) => {

    const existingAlbum = await prisma.album.findUnique({
        where: {
            slug
        },
        include: {
            artists: true,
            genres: true
        }
    });

    if (!existingAlbum) {
        throw new Error("Album not found");
    }

    return existingAlbum;
};


const create = async (albumData) => {

    const {
        musicBrainzId,
        title,
        slug,
        coverImage,
        releaseDate,
        albumType,
        artistId,
        genreIds
    } = albumData;


    const existingAlbum = await prisma.album.findUnique({
        where: {
            slug
        }
    });

    if (existingAlbum) {
        throw new Error("Album already exists");
    }


    const existingArtist = await prisma.artist.findUnique({
        where: {
            id: artistId
        }
    });

    if (!existingArtist) {
        throw new Error("Artist not found");
    }


    const genreArray = Array.isArray(genreIds)
        ? genreIds
        : genreIds
            ? [genreIds]
            : [];


    const album = await prisma.album.create({

        data: {

            musicBrainzId,
            title,
            slug,
            coverImage,

            releaseDate: releaseDate
                ? new Date(releaseDate)
                : null,

            albumType,


            artists: {
                connect: {
                    id: artistId
                }
            },


            genres: {
                connect: genreArray.map(id => ({
                    id
                }))
            }

        }

    });


    return album;
};


const deleteAlbum = async (id) => {

    const existingAlbum = await prisma.album.findUnique({
        where: {
            id
        }
    });

    if (!existingAlbum) {
        throw new Error("Album not found");
    }


    const deletedAlbum = await prisma.album.delete({
        where: {
            id
        }
    });


    return deletedAlbum;
};


const updateAlbum = async (id, albumData) => {

    const {
        musicBrainzId,
        title,
        slug,
        coverImage,
        releaseDate,
        albumType,
        artistId,
        genreIds
    } = albumData;


    const existingAlbum = await prisma.album.findUnique({
        where: {
            id
        }
    });

    if (!existingAlbum) {
        throw new Error("Album not found");
    }


    const genreArray = Array.isArray(genreIds)
        ? genreIds
        : genreIds
            ? [genreIds]
            : [];


    const updatedAlbum = await prisma.album.update({

        where: {
            id
        },

        data: {

            musicBrainzId,
            title,
            slug,
            coverImage,

            releaseDate: releaseDate
                ? new Date(releaseDate)
                : null,

            albumType,


            ...(artistId && {
                artists: {
                    set: [{
                        id: artistId
                    }]
                }
            }),


            genres: {
                set: genreArray.map(id => ({
                    id
                }))
            }

        }

    });


    return updatedAlbum;
};


module.exports = {
    deleteAlbum,
    updateAlbum,
    allAlbum,
    getoneAlbum,
    create
};