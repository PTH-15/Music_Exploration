module.exports = function mapArtistType(type) {
    switch (type) {
        case "Person":
            return "SOLO";

        case "Group":
            return "BAND";

        case "Orchestra":
            return "ORCHESTRA";

        case "Choir":
            return "CHOIR";

        default:
            return "SOLO";
    }
};