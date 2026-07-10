const prisma = require("../utils/prisma");

const getAllSongs = async (req, res, next) => {
    try {
        const songs = await prisma.song.findMany();

        res.json({ songs });

    } catch (error) {
        next(error);
    }
};

const getSongBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const song = await prisma.song.findUnique({
            where: {
                slug
            }
        });

        if (!song) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        res.json(song);

    } catch (error) {
        next(error);
    }
};

const createSong = async (req, res, next) => {
    try {
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
        } = req.body;

        const existingSong = await prisma.song.findUnique({
            where: {
                slug
            }
        });

        if (existingSong) {
            return res.status(409).json({
                message: "Song already exists"
            });
        }
        const existingArtist = await prisma.artist.findUnique({where:{id:artistId}})
        if(!existingArtist){
            return res.status(409).json({
                message: "Artist not found"
            });
        }
        const existingAblum = await prisma.album.findUnique({where:{id:albumId}})
        if(!existingAblum){
            return res.status(409).json({
                message: "Album not found"
            });
        }
        const song = await prisma.song.create({
            data: {
                musicBrainzId,
                title,
                slug,
                coverImage,
                duration,
                trackNumber,
                releaseDate,
                artists:{connect:[{id:artistId}]},
                albums:{connect:[{id:albumId}]}
            }
        });

        res.status(201).json({
            message: "Song created successfully",
            song
        });

    } catch (error) {
        next(error);
    }
};

const updateSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            musicBrainzId,
            title,
            slug,
            coverImage,
            duration,
            trackNumber,
            releaseDate
        } = req.body;

        const existingSong = await prisma.song.findUnique({
            where: {
                id
            }
        });

        if (!existingSong) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        const song = await prisma.song.update({
            where: {
                id
            },
            data: {
                musicBrainzId,
                title,
                slug,
                coverImage,
                duration,
                trackNumber,
                releaseDate
            }
        });

        res.status(200).json({
            message: "Song updated successfully",
            song
        });

    } catch (error) {
        next(error);
    }
};

const deleteSong = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingSong = await prisma.song.findUnique({
            where: {
                id
            }
        });

        if (!existingSong) {
            return res.status(404).json({
                message: "Song not found"
            });
        }

        const deletedSong = await prisma.song.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Song deleted successfully",
            song: deletedSong
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSongs,
    getSongBySlug,
    createSong,
    updateSong,
    deleteSong
};