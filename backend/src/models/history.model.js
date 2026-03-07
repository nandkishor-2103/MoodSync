const mongoose = require('mongoose');

const historySchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        },
        song: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'songs',
            required: true,
        },
        playedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true },
);

// Ensure we only show the most recent play if the same song is played multiple times by the same user
// Or we can just let it be a simple log. Usually, "Recently Played" shows unique songs.
// Let's keep it simple for now and handle uniqueness in the controller or just show latest logs.

const historyModel = mongoose.model('history', historySchema);
module.exports = historyModel;
