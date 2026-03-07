import { createContext, useState, useEffect } from 'react';
import { getMe } from './services/auth.api';
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const cachedUser = localStorage.getItem('user');
        return cachedUser ? JSON.parse(cachedUser) : null;
    });
    const [loading, setLoading] = useState(!user);

    useEffect(() => {
        const initAuth = async () => {
            const lastCheck = localStorage.getItem('lastAuthCheck');
            const now = Date.now();
            const ONE_HOUR = 60 * 60 * 1000;

            // Only fetch from server if:
            // 1. We don't have a user in cache
            // 2. OR the last check was more than 1 hour ago
            if (!user || !lastCheck || now - parseInt(lastCheck) > ONE_HOUR) {
                try {
                    const data = await getMe();

                    if (data.user) {
                        setUser(data.user);
                        localStorage.setItem('user', JSON.stringify(data.user));
                        localStorage.setItem('lastAuthCheck', now.toString());
                    } else {
                        // If we thought we were logged in but server says no, show alert
                        if (user) {
                            toast.error('Session expired. Please login again.');
                        }
                        setUser(null);
                        localStorage.removeItem('user');
                        localStorage.removeItem('lastAuthCheck');
                    }
                } catch (error) {
                    console.error('Session check failed:', error);
                    setUser(null);
                    localStorage.removeItem('user');
                    localStorage.removeItem('lastAuthCheck');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        initAuth();
    }, [user]); // Re-run if user is cleared elsewhere (like interceptor)

    return <AuthContext.Provider value={{ user, setUser, loading, setLoading }}>{children}</AuthContext.Provider>;
};
