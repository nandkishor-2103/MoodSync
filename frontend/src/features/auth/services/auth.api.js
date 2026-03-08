import axios from 'axios';
import { toast } from 'react-hot-toast';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

// Global interceptor for auth synchronization
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            // If the server says Unauthorized, we must clear our local "Ghost" session
            localStorage.removeItem('user');
            localStorage.removeItem('lastAuthCheck');

            // Show alert to user
            toast.error('Session expired. Please login again.');

            // Redirect to login or just reload to trigger AuthProvider re-sync
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    },
);

export async function register({ email, password, username }) {
    const response = await api.post('/api/auth/register', {
        email,
        password,
        username,
    });

    return response.data;
}

export async function login({ email, password, username }) {
    const response = await api.post('/api/auth/login', {
        email,
        username,
        password,
    });
    return response.data;
}

export async function getMe() {
    const response = await api.get('/api/auth/get-me');
    return response.data;
}

export async function logout() {
    const response = await api.get('/api/auth/logout');
    return response.data;
}

export async function updateMe({ username, email, password }) {
    const response = await api.patch('/api/auth/update-me', {
        username,
        email,
        password,
    });
    return response.data;
}

export default api;
