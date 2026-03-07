import React from 'react';
import FaceExpression from '../../expression/components/FaceExpression';
import Player from '../components/Player';
import SongList from '../components/SongList';
import HistoryList from '../components/HistoryList';
import { useSong } from '../hooks/useSong';
import { Link } from 'react-router';
import uploadIcon from '../../../assets/upload.svg';
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
                    <Link to='/upload' className='home-page__upload-btn' title='Upload a Song'>
                        <img src={uploadIcon} alt='Upload' width='16' height='16' />
                        <span>Upload Song</span>
                    </Link>
                </header>
                <div className='home-page__scroll-content'>
                    <FaceExpression
                        onClick={expression => {
                            const mood = MOOD_MAP[expression] || expression.toLowerCase().split(' ')[0];
                            handelGetSong({ mood });
                        }}
                    />
                    <SongList />
                </div>
            </main>
            {song && <Player />}
        </div>
    );
};

export default Home;
