const express = require('express');
const upload = require('../middlewares/upload.middleware');
const songController = require('../controllers/song.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Initialize router
const router = express.Router();

/**
 * @desc Upload a song
 * @route POST /api/songs/
 * @access Private
 */
router.post('/', authMiddleware.authUser, upload.single('song'), songController.uploadSong);

/**
 * @desc Get song
 * @route GET /api/songs/
 * @access Private
 */
router.get('/', authMiddleware.authUser, songController.getSong);

module.exports = router;
