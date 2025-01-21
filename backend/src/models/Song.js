const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    artists: {
        type: [String],
        required: true,
    },
    album: {
        type: String,
    },
    uri: {
        type: String,
        required: true,
    },
    albumArt: {
        type: String,
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party",
        required: true,
    },
    votes: {
        type: Number,
        default: 0,
    },
    addedToQueue: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Song", songSchema);
