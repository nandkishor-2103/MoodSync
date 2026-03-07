import { RouterProvider } from 'react-router';
import router from './app.routes.jsx';
import './features/shared/styles/global.scss';
import { AuthProvider } from './features/auth/auth.context.jsx';
import { SongContextProvider } from './features/home/song.context.jsx';
import { Toaster } from 'react-hot-toast';

function App() {
    return (
        <AuthProvider>
            <SongContextProvider>
                <Toaster
                    position='top-center'
                    toastOptions={{
                        duration: 3000,
                        style: {
                            background: '#1a1a1a',
                            color: '#fff',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#22c55e',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                <RouterProvider router={router} />
            </SongContextProvider>
        </AuthProvider>
    );
}

export default App;
