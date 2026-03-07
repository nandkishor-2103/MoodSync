import { useState } from 'react';
import { uploadSong as uploadSongApi } from '../services/upload.api';

export function useUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleUpload = async (songFile, mood) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            await uploadSongApi(songFile, mood);
            setSuccess(true);
            return true;
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to upload song');
            return false;
        } finally {
            setLoading(false);
        }
    };

    const resetState = () => {
        setError(null);
        setSuccess(false);
    };

    return { loading, error, success, handleUpload, resetState };
}
