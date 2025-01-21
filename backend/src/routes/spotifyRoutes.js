const express = require("express");
const {
    getCurrentTrack,
    searchTracks,
    addToQueue,
} = require("../controllers/spotifyController");

const router = express.Router();

// Route to get the currently playing track
router.get("/current-track", getCurrentTrack);

// Route to search for tracks on Spotify
router.post("/search", searchTracks);

// Route to add a song to the playback queue
router.post("/add-to-queue", addToQueue);

module.exports = router;
