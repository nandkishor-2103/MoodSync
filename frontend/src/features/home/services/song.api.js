import api from '../../auth/services/auth.api';

export async function getSong({ mood }) {
    const response = await api.get(`/api/songs?mood=${mood}`);
    return response.data; // { message, songs: [...] }
}
