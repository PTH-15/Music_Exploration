const songservice = require('../services/song')

const getAllSongs = async (req, res, next) => {
    try {
        const songs = await songservice.getsongs()

        res.json({ songs });

    } catch (error) {
        next(error);
    }
};

const getSongBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const song = await songservice.getasong(slug)

        res.json(song);

    } catch (error) {
        next(error);
    }
};

const createSong = async (req, res, next) => {
    try {
        const song = await songservice.create(req.body)
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

        const song = await songservice.update(id, req.body)

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

        const deletedSong = await songservice.deletesong(id)

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