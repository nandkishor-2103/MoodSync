import api from '../../auth/services/auth.api';

export const addToHistory = async songId => {
    try {
        const response = await api.post('/api/history', { songId });
        return response.data;
    } catch (error) {
        console.error('Add to history API error:', error);
        throw error;
    }
};

export const getHistory = async () => {
    try {
        const response = await api.get('/api/history');
        return response.data;
    } catch (error) {
        console.error('Get history API error:', error);
        throw error;
    }
};
