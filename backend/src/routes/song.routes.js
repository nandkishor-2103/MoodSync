const express = require('express');
const upload = require('../middlewares/upload.middleware');
const songController = require('../controllers/song.controller');

// Initialize router
const router = express.Router();


/**
 * @desc Upload a song
 * @route POST /api/songs/
 * @access Private
 */
router.post('/', upload.single('song'), songController.uploadSong);

/**
 * @desc Get song
 * @route GET /api/songs/
 * @access Private
 */
router.get('/', songController.getSong);

module.exports = router;
