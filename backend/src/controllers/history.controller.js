const historyModel = require('../models/history.model');

exports.addToHistory = async (req, res) => {
    try {
        const { songId } = req.body;
        const userId = req.user.id;

        if (!songId) {
            return res.status(400).json({ message: 'Song ID is required' });
        }

        // Find if this song was already in user's history
        let historyItem = await historyModel.findOne({ user: userId, song: songId });

        if (historyItem) {
            historyItem.playedAt = Date.now();
            await historyItem.save();
        } else {
            historyItem = await historyModel.create({
                user: userId,
                song: songId,
            });
        }

        res.status(200).json({ success: true, historyItem });
    } catch (error) {
        console.error('Add to history error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get latest 2 unique songs from history
        const history = await historyModel.find({ user: userId }).sort({ playedAt: -1 }).limit(12).populate('song');

        res.status(200).json({ success: true, history });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
