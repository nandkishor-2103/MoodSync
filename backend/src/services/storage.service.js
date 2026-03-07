const ImageKit = require('@imagekit/nodejs');

// Initialize ImageKit
const client = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || 'missing_private_key',
});

// Upload file
async function uploadFile({ buffer, fileName, folder }) {
    const file = await client.files.upload({
        // Convert buffer to file
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName: fileName,
        folder,
    });
    return file;
}

module.exports = {
    uploadFile,
};
