import React, { useContext } from 'react';
import FaceExpression from '../../expression/components/FaceExpression';
import Player from '../components/Player';
import SongList from '../components/SongList';
import HistoryList from '../components/HistoryList';
import { useSong } from '../hooks/useSong';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../auth/auth.context';
import { logout } from '../../auth/services/auth.api';
import { toast } from 'react-hot-toast';
import uploadIcon from '../../../assets/upload.svg';
import logoutIcon from '../../../assets/logout.svg';
import './home.scss';

// Map output labels from expressions to DB enum values
const MOOD_MAP = {
    'Happy 😄': 'happy',
    'Sad 😢': 'sad',
    'Surprised 😲': 'surprised',
    Neutral: 'happy', // fallback to happy for neutral
};

const Home = () => {
    const { handelGetSong, song } = useSong();
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('lastAuthCheck');
        toast.success('Logged out successfully');
        navigate('/login');
        logout().catch(() => {});
    };

    const getInitials = name => {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    };

    return (
        <div className='home-page'>
            <aside className='home-page__sidebar'>
                <HistoryList />
            </aside>
            <main className='home-page__main'>
                <header className='home-page__header'>
                    <div className='home-page__brand'>
                        <img src='/logo.svg' alt='MoodSync Logo' className='home-page__logo' width='32' height='32' />
                        <span className='home-page__logo-text'>
                            Mood<span>Sync</span>
                        </span>
                    </div>
                    <div className='home-page__header-actions'>
                        <Link to='/upload' className='home-page__upload-btn' title='Upload a Song'>
                            <img src={uploadIcon} alt='Upload' width='16' height='16' />
                            <span>Upload Song</span>
                        </Link>
                        <Link
                            to='/profile'
                            className='home-page__icon-btn home-page__icon-btn--avatar'
                            title={`Profile: ${user?.username}`}
                            aria-label='Go to profile'>
                            {getInitials(user?.username)}
                        </Link>
                        <button
                            className='home-page__icon-btn home-page__icon-btn--logout'
                            onClick={handleLogout}
                            title='Logout'
                            aria-label='Logout'>
                            <img src={logoutIcon} alt='Logout' width='18' height='18' />
                        </button>
                    </div>
                </header>
                <div className='home-page__scroll-content'>
                    <FaceExpression
                        onClick={expression => {
                            const mood = MOOD_MAP[expression] || expression.toLowerCase().split(' ')[0];
                            handelGetSong({ mood });
                        }}
                    />
                    <div className='home-page__mobile-history'>
                        <HistoryList />
                    </div>
                    <SongList />
                </div>
            </main>
            {song && <Player />}
        </div>
    );
};

export default Home;
