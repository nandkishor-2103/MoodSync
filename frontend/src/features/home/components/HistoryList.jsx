import React, { useEffect, useState } from 'react';
import { getHistory } from '../services/history.api';
import { useSong } from '../hooks/useSong';
import playIcon from '../../../assets/play.svg';
import './historyList.scss';

const HistoryList = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectSong, song: activeSong } = useSong();

    const fetchHistory = async () => {
        try {
            // Small delay to ensure the parallel addToHistory call finishes on backend
            await new Promise(resolve => setTimeout(resolve, 800));
            const data = await getHistory();
            setHistory(data.history || []);
        } catch (error) {
            console.error('Failed to fetch history:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [activeSong]); // Re-fetch when a new song starts playing to keep it fresh

    if (loading && history.length === 0) return null;

    if (!loading && history.length === 0) {
        return (
            <section className='history-list'>
                <div className='history-list__header'>
                    <h2 className='history-list__title'>Recently Played</h2>
                </div>
                <div className='history-list__empty'>
                    <p>No recent music played</p>
                </div>
            </section>
        );
    }

    return (
        <section className='history-list'>
            <div className='history-list__header'>
                <h2 className='history-list__title'>Recently Played</h2>
            </div>
            <div className='history-list__scroll-container'>
                <div className='history-list__row'>
                    {history.map((item, index) => {
                        const s = item.song;
                        if (!s) return null;
                        return (
                            <button
                                key={item._id}
                                className={`history-card ${activeSong?._id === s._id ? 'history-card--active' : ''}`}
                                onClick={() => selectSong(s)}
                                style={{ animationDelay: `${index * 0.04}s` }}>
                                <div className='history-card__img-wrap'>
                                    <img src={s.posterUrl} alt={s.title} />
                                    <div className='history-card__overlay'>
                                        <img src={playIcon} alt='Play' width='20' height='20' />
                                    </div>
                                </div>
                                <div className='history-card__info'>
                                    <p title={s.title}>{s.title}</p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HistoryList;
