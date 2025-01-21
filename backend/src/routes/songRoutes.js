const express = require("express");
const {
    suggestSong,
    voteForSong,
    getVotingData,
} = require("../controllers/songController");

const router = express.Router();

// Route to suggest a new song for a party
router.post("/suggest", suggestSong);

// Route to get all voting data for a party
router.get("/:code", getVotingData);

// Route to vote for a song
router.post("/vote", voteForSong);

module.exports = router;
