// partyController.js
const parties = {}; // In-memory storage for parties (use a database in production)

// Create a new party
const createParty = (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({ message: "Party code is required." });
        }

        if (parties[code]) {
            return res.status(400).json({ message: "Party code already exists." });
        }

        parties[code] = { songs: [], votes: {}, currentSong: null };
        console.log(`Party created: ${code}`);
        res.status(201).json({ message: "Party created successfully.", code });
    } catch (error) {
        console.error("Error creating party:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Join an existing party
const joinParty = (req, res) => {
    try {
        const { code } = req.body;

        if (!code || !parties[code]) {
            return res.status(404).json({ message: "Party not found." });
        }

        console.log(`User joined party: ${code}`);
        res.status(200).json({ message: "Successfully joined the party.", code });
    } catch (error) {
        console.error("Error joining party:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Get party details by code
const getPartyDetails = (req, res) => {
    try {
        const { code } = req.params;

        if (!parties[code]) {
            return res.status(404).json({ message: "Party not found." });
        }

        res.status(200).json({ party: parties[code] });
    } catch (error) {
        console.error("Error getting party details:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// Set current song for the party
const setCurrentSong = (req, res) => {
    try {
        const { partyId } = req.params;
        const { song } = req.body;

        if (!parties[partyId]) {
            return res.status(404).json({ message: "Party not found." });
        }

        parties[partyId].currentSong = song; // Update current song
        console.log(`Current song updated for party ${partyId}: ${song}`);
        res.status(200).json({ message: "Current song set successfully.", song });
    } catch (error) {
        console.error("Error setting current song:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

module.exports = {
    createParty,
    joinParty,
    getPartyDetails,
    setCurrentSong,
};
