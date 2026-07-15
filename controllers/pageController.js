const prisma = require("../utils/prisma");

const renderExploreArtists = async (req, res, next) => {
    try {
        const artists = await prisma.artist.findMany();

        res.render("explore-artists", { artists });
    } catch (error) {
        next(error);
    }
};
const renderArtistPage = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const artist = await prisma.artist.findUnique({
            where: {
                slug
            },
            include:{
                albums:true,
                songs:true,
                genres:true,
                primaryGenre:true
            }
        });
        if (!artist) {
            return res.status(404).send("Artist Not Found");
        }
        res.render("artist", { artist });
    }
    catch (error) {
        next(error);
    }
};
const renderAlbumPage = async (req, res, next) => {

    try {

        const { slug } = req.params;

        const album = await prisma.album.findUnique({

            where: {
                slug
            },

            include: {
                artists: true,
                songs: true,
                genres: true
            }

        });

        if (!album) {

            return res.status(404).send("Album not found");

        }

        res.render("album", { album });

    } catch (error) {

        next(error);

    }

};
module.exports = {
    renderExploreArtists,
    renderArtistPage,
    renderAlbumPage
};