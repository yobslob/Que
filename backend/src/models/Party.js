const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
    },
    host: {
        type: String, // You can use a user ID or Spotify user ID
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    currentSong: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
    },
});

module.exports = mongoose.model("Party", partySchema);
