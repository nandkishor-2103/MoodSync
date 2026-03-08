const express = require('express');
const upload = require('../middlewares/upload.middleware');
const songController = require('../controllers/song.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', authMiddleware.authUser, upload.single('song'), songController.uploadSong);
router.get('/', authMiddleware.authUser, songController.getSong);

module.exports = router;
