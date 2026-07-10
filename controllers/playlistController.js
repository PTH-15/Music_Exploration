const prisma = require("../utils/prisma");

// Get All Playlists
const getAllPlaylists = async (req, res, next) => {
    try {
        const playlists = await prisma.playlist.findMany();

        res.json({ playlists });

    } catch (error) {
        next(error);
    }
};

// Get Playlist By Slug
const getPlaylistBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const playlist = await prisma.playlist.findUnique({
            where: {
                slug
            }
        });

        if (!playlist) {
            return res.status(404).json({
                message: "Playlist not found"
            });
        }

        res.json(playlist);

    } catch (error) {
        next(error);
    }
};

// Create Playlist
const createPlaylist = async (req, res, next) => {
    try {
        const {
            title,
            slug,
            description,
            coverImage,
            creatorId,
            visibility
        } = req.body;

        const existingPlaylist = await prisma.playlist.findUnique({
            where: {
                slug
            }
        });

        if (existingPlaylist) {
            return res.status(409).json({
                message: "Playlist already exists"
            });
        }

        const playlist = await prisma.playlist.create({
            data: {
                title,
                slug,
                description,
                coverImage,
                creatorId,
                visibility
            }
        });

        res.status(201).json({
            message: "Playlist created successfully",
            playlist
        });

    } catch (error) {
        next(error);
    }
};

// Update Playlist
const updatePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const {
            title,
            slug,
            description,
            coverImage,
            visibility
        } = req.body;

        const existingPlaylist = await prisma.playlist.findUnique({
            where: {
                id
            }
        });

        if (!existingPlaylist) {
            return res.status(404).json({
                message: "Playlist not found"
            });
        }

        const playlist = await prisma.playlist.update({
            where: {
                id
            },
            data: {
                title,
                slug,
                description,
                coverImage,
                visibility
            }
        });

        res.status(200).json({
            message: "Playlist updated successfully",
            playlist
        });

    } catch (error) {
        next(error);
    }
};

// Delete Playlist
const deletePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const existingPlaylist = await prisma.playlist.findUnique({
            where: {
                id
            }
        });

        if (!existingPlaylist) {
            return res.status(404).json({
                message: "Playlist not found"
            });
        }

        const deletedPlaylist = await prisma.playlist.delete({
            where: {
                id
            }
        });

        res.status(200).json({
            message: "Playlist deleted successfully",
            playlist: deletedPlaylist
        });

    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPlaylists,
    getPlaylistBySlug,
    createPlaylist,
    updatePlaylist,
    deletePlaylist
};