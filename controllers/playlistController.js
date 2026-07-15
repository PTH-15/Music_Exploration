const playlistservice = require('../services/playlist')

const getAllPlaylists = async (req, res, next) => {
    try {
        const playlists = await playlistservice.getPlaylists()

        res.json({ playlists });

    } catch (error) {
        next(error);
    }
};

const getPlaylistBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const playlist = await playlistservice.getaplaylist(slug)
        res.json(playlist);
    } catch (error) {
        next(error);
    }
};

const createPlaylist = async (req, res, next) => {
    try {
       const playlist = await playlistservice.create(req.body)
        res.status(201).json({
            message: "Playlist created successfully",
            playlist
        });
    } catch (error) {
        next(error);
    }
};

const updatePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params;
       const playlist = await playlistservice.update(id,req.body)
        res.status(200).json({
            message: "Playlist updated successfully",
            playlist
        });

    } catch (error) {
        next(error);
    }
};

const deletePlaylist = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedPlaylist = await playlistservice.deletePlaylist(id)

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