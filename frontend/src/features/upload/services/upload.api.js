import api from '../../auth/services/auth.api';

/**
 * Upload a song with an MP3 file and a mood string.
 * Uses multipart/form-data.
 */
export const uploadSong = async (songFile, mood) => {
    try {
        const formData = new FormData();
        formData.append('song', songFile);
        formData.append('mood', mood);

        const response = await api.post(`/api/songs`, formData);

        return response.data;
    } catch (error) {
        console.error('Error in uploadSong API:', error);
        throw error;
    }
};
