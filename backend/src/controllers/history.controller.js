const historyModel = require('../models/history.model');

exports.addToHistory = async (req, res) => {
    try {
        const { songId } = req.body;
        const userId = req.user.id;
        const username = req.user.username;

        if (!songId) {
            return res.status(400).json({ message: 'Song ID is required' });
        }

        let historyItem = await historyModel.findOne({ user: userId, song: songId });

        if (historyItem) {
            historyItem.playedAt = Date.now();
            historyItem.username = username;
            await historyItem.save();
        } else {
            historyItem = await historyModel.create({
                user: userId,
                username,
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

        const history = await historyModel.find({ user: userId }).sort({ playedAt: -1 }).limit(12).populate('song');

        res.status(200).json({ success: true, history });
    } catch (error) {
        console.error('Get history error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
