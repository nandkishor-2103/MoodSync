import { login, register, getMe, logout } from '../services/auth.api.js';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth.context.jsx';

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;

    async function handelRegister({ username, email, password }) {
        setLoading(true);
        const data = await register({ username, email, password });
        setUser(data.user);
        setLoading(false);
    }

    async function handelLogin({ username, email, password }) {
        setLoading(true);
        const data = await login({ username, email, password });
        setUser(data.user);
        setLoading(false);
    }

    async function handelGetMe() {
        setLoading(true);
        const data = await getMe();
        setUser(data.user);
        setLoading(false);
    }

    async function handelLogout() {
        setLoading(true);
        await logout();
        setUser(null);
        setLoading(false);
    }

    useEffect(() => {
        handelGetMe()
            .then(() => {
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch user:', error);
                setLoading(false);
            });
    }, []);

    return {
        user,
        loading,
        handelRegister,
        handelLogin,
        handelGetMe,
        handelLogout,
    };
};
