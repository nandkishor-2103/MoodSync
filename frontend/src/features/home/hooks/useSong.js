import { getSong } from '../services/song.api';
import { addToHistory } from '../services/history.api';
import { useContext } from 'react';
import { SongContext } from '../song.context';

export const useSong = () => {
    const context = useContext(SongContext);

    const { songs, setSongs, song, setSong, loading, setLoading } = context;

    async function handelGetSong({ mood }) {
        setLoading(true);
        setSong(null); // clear current player while fetching
        setSongs([]); // clear old list
        try {
            const data = await getSong({ mood });
            setSongs(data.songs || []);
        } catch (error) {
            console.error('Error fetching songs:', error);
        } finally {
            setLoading(false);
        }
    }

    function selectSong(songItem) {
        setSong(songItem); // this triggers the Player to show & play

        // Log to history in background
        if (songItem?._id) {
            addToHistory(songItem._id).catch(err => console.error('History log failed:', err));
        }
    }

    return { loading, songs, song, handelGetSong, selectSong };
};
