import React from 'react';
import FaceExpression from '../../expression/components/FaceExpression';
import Player from '../components/Player';
import SongList from '../components/SongList';
import { useSong } from '../hooks/useSong';

// Map displayed expressions to DB enum values
const MOOD_MAP = {
    'Happy 😄': 'happy',
    'Sad 😢': 'sad',
    'Surprised 😲': 'surprised',
    Neutral: 'happy', // fallback to happy for neutral
};

const Home = () => {
    const { handelGetSong } = useSong();
    return (
        <>
            <FaceExpression
                onClick={expression => {
                    const mood = MOOD_MAP[expression] || expression.toLowerCase().split(' ')[0];
                    handelGetSong({ mood });
                }}
            />
            <SongList />
            <Player />
        </>
    );
};

export default Home;
