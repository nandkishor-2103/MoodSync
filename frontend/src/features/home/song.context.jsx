/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const SongContext = createContext(null);

export const SongContextProvider = ({ children }) => {
    // list of songs for detected mood
    const [songs, setSongs] = useState([]);
    // currently selected / playing song
    const [song, setSong] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <SongContext.Provider value={{ songs, setSongs, song, setSong, loading, setLoading }}>
            {children}
        </SongContext.Provider>
    );
};
