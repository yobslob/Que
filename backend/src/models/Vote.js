const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
    userId: {
        type: String, // You can use user ID or a session ID
        required: true,
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Song",
        required: true,
    },
    party: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Party",
        required: true,
    },
    voteType: {
        type: String,
        enum: ["upvote", "downvote"],
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Vote", voteSchema);
