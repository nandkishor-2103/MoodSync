const songModel = require('../models/song.model');
const storageServices = require('../services/storage.service');
const id3 = require('node-id3');

/**
 * Upload a song
 * @route POST /api/songs/
 */
async function uploadSong(req, res) {
    try {
        const songBuffer = req.file.buffer;
        const { mood } = req.body;

        const tags = id3.read(songBuffer);

        const [songFile, posterFile] = await Promise.all([
            storageServices.uploadFile({
                buffer: songBuffer,
                fileName: tags.title + '.mp3',
                folder: '/cohort-2/moodsync/songs',
            }),
            storageServices.uploadFile({
                buffer: tags.image.imageBuffer,
                fileName: tags.title + '.jpeg',
                folder: '/cohort-2/moodsync/posters',
            }),
        ]);

        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood,
        });

        res.status(201).json({
            message: 'Song uploaded successfully',
            song,
        });
    } catch (error) {
        console.error('Error in uploadSong:', error);
        res.status(500).json({ message: 'Internal server error during song upload' });
    }
}

/**
 * Get a song
 * @route GET /api/songs
 */
async function getSong(req, res) {
    try {
        const { mood } = req.query;

        const songs = await songModel.find({ mood });

        res.status(200).json({
            message: 'Songs fetched successfully',
            songs,
        });
    } catch (error) {
        console.error('Error in getSong:', error);
        res.status(500).json({ message: 'Internal server error during song fetch' });
    }
}

module.exports = {
    uploadSong,
    getSong,
};
