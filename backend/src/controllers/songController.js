const { parties } = require("./partyController"); // Reference the shared parties object

// Suggest a song
const suggestSong = (req, res) => {
    try {
        const { code, songId, songName } = req.body;

        if (!code || !parties[code]) {
            return res.status(404).json({ message: "Party not found." });
        }

        if (!songId || !songName) {
            return res.status(400).json({ message: "Song ID and name are required." });
        }

        if (!parties[code].votes[songId]) {
            parties[code].votes[songId] = { name: songName, votes: 0 };
            console.log(`Song suggested: ${songName} (ID: ${songId}) in party ${code}`);
            return res.status(201).json({ message: "Song suggested successfully." });
        } else {
            return res.status(400).json({ message: "Song already suggested." });
        }
    } catch (error) {
        console.error("Error suggesting song:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Vote for a song
const voteForSong = (req, res) => {
    try {
        const { code, songId } = req.body;

        if (!code || !parties[code]) {
            return res.status(404).json({ message: "Party not found." });
        }

        if (!songId || !parties[code].votes[songId]) {
            return res.status(404).json({ message: "Song not found." });
        }

        parties[code].votes[songId].votes += 1;
        console.log(
            `Vote registered for song ID: ${songId} in party ${code} (Total votes: ${parties[code].votes[songId].votes})`
        );
        res.status(200).json({ message: "Vote registered successfully." });
    } catch (error) {
        console.error("Error registering vote:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get voting data for a party
const getVotingData = (req, res) => {
    try {
        const { code } = req.params;

        if (!code || !parties[code]) {
            return res.status(404).json({ message: "Party not found." });
        }

        const votes = parties[code].votes;
        console.log(`Retrieved voting data for party ${code}`);
        res.status(200).json({ votes });
    } catch (error) {
        console.error("Error fetching voting data:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    suggestSong,
    voteForSong,
    getVotingData,
};
