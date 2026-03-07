import { login, register, getMe, logout } from '../services/auth.api.js';
import { useContext } from 'react';
import { AuthContext } from '../auth.context.jsx';

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    async function handelRegister({ username, email, password }) {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            return data;
        } finally {
            setLoading(false);
        }
    }

    async function handelLogin({ username, email, password }) {
        setLoading(true);
        try {
            const data = await login({ username, email, password });
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('lastAuthCheck', Date.now().toString());
        } finally {
            setLoading(false);
        }
    }

    async function handelGetMe() {
        setLoading(true);
        try {
            const data = await getMe();
            setUser(data.user);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('lastAuthCheck', Date.now().toString());
        } finally {
            setLoading(false);
        }
    }

    async function handelLogout() {
        setLoading(true);
        try {
            await logout();
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('lastAuthCheck');
        } finally {
            setLoading(false);
        }
    }

    return {
        user,
        loading,
        handelRegister,
        handelLogin,
        handelGetMe,
        handelLogout,
    };
};
