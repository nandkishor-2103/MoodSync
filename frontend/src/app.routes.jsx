import { createBrowserRouter } from 'react-router';
import Login from './features/auth/pages/Login.jsx';
import Register from './features/auth/pages/Register';
import Profile from './features/auth/pages/Profile.jsx';
import Protected from './features/auth/components/Protected.jsx';
import Home from './features/home/pages/Home.jsx';
import Upload from './features/upload/pages/Upload.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Protected>
                <Home />
            </Protected>
        ),
    },

    {
        path: '/upload',
        element: (
            <Protected>
                <Upload />
            </Protected>
        ),
    },

    {
        path: '/login',
        element: <Login />,
    },

    {
        path: '/register',
        element: <Register />,
    },

    {
        path: '/profile',
        element: (
            <Protected>
                <Profile />
            </Protected>
        ),
    },
]);

export default router;
