const spotifyApi = require("../utils/spotifyAuth");

// Fetch the currently playing track
const getCurrentTrack = async (req, res) => {
    try {
        const data = await spotifyApi.getMyCurrentPlayingTrack();

        if (!data.body || !data.body.item) {
            return res.status(404).json({ message: "No track currently playing." });
        }

        const currentTrack = {
            name: data.body.item.name,
            artists: data.body.item.artists.map((artist) => artist.name).join(", "),
            album: data.body.item.album.name,
            albumArt: data.body.item.album.images[0]?.url,
            uri: data.body.item.uri,
        };

        console.log("Currently playing track fetched successfully.");
        res.status(200).json({ track: currentTrack });
    } catch (error) {
        console.error("Error fetching current track:", error.message);
        res.status(500).json({
            message: "Failed to fetch the current playing track.",
            error: error.message,
        });
    }
};

// Search for tracks
const searchTracks = async (req, res) => {
    const { query } = req.body;

    if (!query) {
        return res.status(400).json({ message: "Search query is required." });
    }

    try {
        const data = await spotifyApi.searchTracks(query, { limit: 10 });

        const tracks = data.body.tracks.items.map((track) => ({
            name: track.name,
            artists: track.artists.map((artist) => artist.name).join(", "),
            album: track.album.name,
            uri: track.uri,
            albumArt: track.album.images[0]?.url,
        }));

        console.log("Track search successful.");
        res.status(200).json({ tracks });
    } catch (error) {
        console.error("Error searching for tracks:", error.message);
        res.status(500).json({
            message: "Failed to search for tracks.",
            error: error.message,
        });
    }
};

// Add a track to the playback queue
const addToQueue = async (req, res) => {
    const { uri } = req.body;

    if (!uri) {
        return res.status(400).json({ message: "Track URI is required." });
    }

    try {
        await spotifyApi.addToQueue(uri);
        console.log(`Track added to queue: ${uri}`);
        res.status(200).json({ message: "Track added to queue successfully." });
    } catch (error) {
        console.error("Error adding track to queue:", error.message);
        res.status(500).json({
            message: "Failed to add track to queue.",
            error: error.message,
        });
    }
};

module.exports = {
    getCurrentTrack,
    searchTracks,
    addToQueue,
};
