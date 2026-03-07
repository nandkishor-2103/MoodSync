import React from 'react';
import { useSong } from '../hooks/useSong';
import playIcon from '../../../assets/play.svg';
import './songList.scss';

const SongList = () => {
    const { songs, loading, selectSong, song: activeSong } = useSong();

    if (loading) {
        return (
            <div className='song-list__loading'>
                <div className='song-list__spinner' />
                <p>Finding songs for your mood…</p>
            </div>
        );
    }

    if (!songs || songs.length === 0) return null;

    return (
        <section className='song-list'>
            <h2 className='song-list__heading'>
                Songs for your mood
                <span className='song-list__count'>{songs.length}</span>
            </h2>
            <div className='song-list__grid'>
                {songs.map((s, index) => (
                    <button
                        key={s._id}
                        className={`song-list__card ${activeSong?._id === s._id ? 'song-list__card--active' : ''}`}
                        onClick={() => selectSong(s)}
                        title={`Play "${s.title}"`}
                        style={{ animationDelay: `${index * 0.05}s` }}>
                        <div className='song-list__img-wrap'>
                            <img src={s.posterUrl} alt={s.title} className='song-list__poster' />
                            <div className='song-list__play-overlay'>
                                {activeSong?._id === s._id ? (
                                    /* Animated bars when this card is active */
                                    <span className='song-list__bars'>
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                ) : (
                                    <img src={playIcon} alt='Play' width='28' height='28' />
                                )}
                            </div>
                        </div>
                        <div className='song-list__info'>
                            <p className='song-list__title'>{s.title}</p>
                            <span className='song-list__mood'>{s.mood}</span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default SongList;
