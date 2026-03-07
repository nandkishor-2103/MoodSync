const songModel = require('../models/song.model');
const storageServices = require('../services/storage.service');
const id3 = require('node-id3');

async function uploadSong(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const songBuffer = req.file.buffer;
        const { mood } = req.body;

        let tags = {};
        try {
            tags = id3.read(songBuffer) || {};
        } catch (id3Error) {
            console.warn('ID3 metadata reading failed, using defaults:', id3Error.message);
        }

        const title = tags.title || req.file.originalname.replace(/\.[^/.]+$/, ''); // fallback to filename
        const uploadPromises = [];

        // 1. Upload Song File
        uploadPromises.push(
            storageServices.uploadFile({
                buffer: songBuffer,
                fileName: `${title}-${Date.now()}.mp3`,
                folder: '/cohort-2/moodsync/songs',
            }),
        );

        // 2. Conditional Upload Poster File
        let hasImage = tags.image && tags.image.imageBuffer;
        if (hasImage) {
            uploadPromises.push(
                storageServices.uploadFile({
                    buffer: tags.image.imageBuffer,
                    fileName: `${title}-${Date.now()}.jpeg`,
                    folder: '/cohort-2/moodsync/posters',
                }),
            );
        }

        const uploadResults = await Promise.all(uploadPromises);
        const songFile = uploadResults[0];
        const posterFile = hasImage ? uploadResults[1] : null;

        const song = await songModel.create({
            title,
            url: songFile.url,
            // Fallback poster if not found in tags
            posterUrl: posterFile
                ? posterFile.url
                : 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=300&auto=format&fit=crop',
            mood,
        });

        res.status(201).json({
            message: 'Song uploaded successfully',
            song,
        });
    } catch (error) {
        console.error('CRITICAL: Error in uploadSong:', error);
        res.status(500).json({
            message: 'Internal server error during song upload',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
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
