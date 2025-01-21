const express = require("express");
const {
    createParty,
    joinParty,
    getPartyDetails,
    setCurrentSong,
} = require("../controllers/partyController");

const router = express.Router();

// Route to create a new party
router.post("/create-party", createParty);

// Route to join an existing party
router.post("/join-party", joinParty);

// Route to get party details using a code
router.get("/:code", getPartyDetails);

// Route to set the current song for the party
router.put("/:partyId/current-song", setCurrentSong);

module.exports = router;
