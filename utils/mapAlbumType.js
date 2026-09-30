const mapAlbumType = (type) => {
    const types = {
        ALBUM: "ALBUM",
        SINGLE: "SINGLE",
        EP: "EP",
        BROADCAST: "BROADCAST",
        OTHER: "OTHER"
    };

    return types[type] || "OTHER";
};

module.exports = mapAlbumType;