const { searchArtists } = require("../services/musicbrainzService");
const {

    getArtistById
} = require("../services/musicbrainzService");
const prisma = require("../utils/prisma");
const mapArtistType = require("../utils/mapArtistType");
exports.renderDashboard = (req, res) => {
    res.render("admin/dashboard");
};
exports.renderArtists = (req, res) => {
    res.render("admin/artists/index");
};
exports.renderDashboard = (req, res) => {
    res.render("admin/dashboard", {
        activePage: "dashboard"
    });
};

exports.renderArtists = (req, res) => {
    res.render("admin/artists/index", {
        activePage: "artists"
    });
};
exports.renderCreateArtistForm = async (req, res) => {

    const id = req.query.id;

    const artist = await getArtistById(id);
    const genres = await prisma.genre.findMany({
        orderBy: {
            name: "asc"
        },
    })
    const slug = artist.name
        .toLowerCase()
        .replace(/\s+/g, "-");

    res.render("admin/artists/create", {
        activePage: "artists",
        artist,
        slug,
        genres
    });

};
exports.renderArtistSearch = (req, res) => {
    res.render("admin/artists/search", {
        activePage: "artists",
        artists: [],
        query: ""
    });
};
exports.searchArtist = async (req, res) => {
    const query = req.query.q;

    const artists = await searchArtists(query);
    console.log(artists);
    res.render("admin/artists/search", {
        activePage: "artists",
        artists,
        query
    });
};
exports.createArtist = async (req, res) => {

    try {

        const {

            name,
            slug,
            country,
            musicBrainzId,
            type,
            primaryGenreId,
            genreIds

        } = req.body;

        // Check duplicate
        const existingArtist = await prisma.artist.findUnique({

            where: {

                musicBrainzId

            }

        });

        if (existingArtist) {

            return res.send("Artist already imported.");

        }


        console.log(req.body);
        console.log(genreIds);
        console.log(typeof genreIds);
        console.log(Array.isArray(genreIds));
        const genreArray = Array.isArray(genreIds)
            ? genreIds
            : genreIds
                ? [genreIds]
                : [];

        console.log(genreArray);
        await prisma.artist.create({

            data: {
                name,
                slug,
                country,
                musicBrainzId,
                type: mapArtistType(type),

                primaryGenre: {
                    connect: {
                        id: primaryGenreId
                    }
                },

                genres: {
                    connect: genreArray.map(id => ({
                        id
                    }))
                }
            }

        });

        res.redirect("/admin/artists");

    } catch (err) {

        console.log(err);

        res.send("Something went wrong.");

    }

};
exports.renderArtists = async (req, res) => {
    const artists = await prisma.artist.findMany({
        orderBy: {
            name: "asc"
        }
    });

    res.render("admin/artists/index", {
        activePage: "artists",
        artists
    });
};
exports.renderEditArtistForm = async (req, res) => {

    const artist = await prisma.artist.findUnique({
        where: {
            id: req.params.id
        }
    });
    const genres = await prisma.genre.findMany({
        orderBy: {
            name: "asc"
        }
    });
    if (!artist) {
        return res.redirect("/admin/artists");
    }

    res.render("admin/artists/edit", {
        activePage: "artists",
        artist,
        genres
    });

};
exports.updateArtist = async (req, res) => {

    try {

        const {
            name,
            slug,
            country,
            type,
            primaryGenreId

        } = req.body;

        await prisma.artist.update({

            where: {
                id: req.params.id
            },

            data: {

                name,
                slug,
                country,
                type: mapArtistType(type),
                primaryGenre: {
                    connect: {
                        id: primaryGenreId
                    }
                }


            }

        });

        res.redirect("/admin/artists");

    } catch (err) {

        console.log(err);
        console.error(err);
        res.send("Something went wrong.");

    }

};
exports.deleteArtist = async (req, res) => {

    try {

        await prisma.artist.delete({

            where: {
                id: req.params.id
            }

        });

        res.redirect("/admin/artists");

    } catch (err) {

        console.log(err);

        res.send("Unable to delete artist.");

    }

};

