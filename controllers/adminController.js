const { searchArtists } = require("../services/musicbrainzService");
const {
    
    getArtistById
} = require("../services/musicbrainzService");
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

    const slug = artist.name
        .toLowerCase()
        .replace(/\s+/g, "-");

    res.render("admin/artists/create", {
        activePage: "artists",
        artist,
        slug
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

    res.render("admin/artists/search", {
        activePage: "artists",
        artists,
        query
    });
};
