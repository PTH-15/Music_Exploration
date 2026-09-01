const axios = require("axios");
const BASE_URL = "https://musicbrainz.org/ws/2";


exports.searchArtists = async (query) => {

    const response = await axios.get(
        "https://musicbrainz.org/ws/2/artist",
        {
            params:{
                query,
                fmt:"json"
            },
            headers:{
                "User-Agent":"MusicExploration/1.0 (your@email.com)"
            }
        }
    );

    return response.data.artists;
}
exports.searchAlbum = async (query, artistMusicBrainzId) => {
    const response = await axios.get(
        "https://musicbrainz.org/ws/2/release",
        {
            params: {
                query: `release:${query} AND arid:${artistMusicBrainzId}`,
                fmt: "json",
                limit: 20
            },
            headers: {
                "User-Agent": "MusicExploration/1.0 (your@email.com)"
            },
            timeout: 10000
        }
    );

    return response.data.releases;
};
exports.getAlbumById = async (id) => {
    try {

        const response = await axios.get(
            `${BASE_URL}/release/${id}`,
            {
                params: {
                    fmt: "json"
                },
                headers: {
                    "User-Agent": "MusicExploration/1.0 (your-email@example.com)"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(error.message);

        return null;

    }
};
exports.getArtistById = async (id) => {
    try {

        const response = await axios.get(
            `${BASE_URL}/artist/${id}`,
            {
                params: {
                    fmt: "json"
                },
                headers: {
                    "User-Agent": "MusicExploration/1.0 (your-email@example.com)"
                }
            }
        );

        return response.data;

    } catch (error) {

        console.error(error.message);

        return null;

    }
};

exports.getSong = async(id) =>{
    try {
        const song = await axios.get(
            `${BASE_URL}/recording/${id}`,
            {
                params: {
                    fmt: "json"
                },
                headers: {
                    "User-Agent": "MusicExploration/1.0 (your-email@example.com)"
                }
            }
        )
        return song.data;
    } catch (error) {
        console.error(error.message)
    }
}