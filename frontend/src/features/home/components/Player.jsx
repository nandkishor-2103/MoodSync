import React, { useRef, useState, useEffect } from 'react';
import { useSong } from '../hooks/useSong';
import skipBackIcon from '../../../assets/skip-back.svg';
import skipForwardIcon from '../../../assets/skip-forward.svg';
import playIcon from '../../../assets/play.svg';
import pauseIcon from '../../../assets/pause.svg';
import volumeIcon from '../../../assets/volume.svg';
import muteIcon from '../../../assets/mute.svg';
import './player.scss';

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2];

const formatTime = seconds => {
    if (isNaN(seconds)) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60)
        .toString()
        .padStart(2, '0');
    return `${m}:${s}`;
};

const Player = () => {
    const { song } = useSong();

    const audioRef = useRef(null);
    const progressRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);
    const [volume, setVolume] = useState(1);
    const [showSpeed, setShowSpeed] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);

    // Load new song when it changes, but don't auto-play
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio || !song?.url) return;

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentTime(0);
         
        setIsPlaying(false);
        audio.load();
    }, [song?.url]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const skip = secs => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.currentTime = Math.min(Math.max(audio.currentTime + secs, 0), duration);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleProgressClick = e => {
        const bar = progressRef.current;
        const rect = bar.getBoundingClientRect();
        const ratio = (e.clientX - rect.left) / rect.width;
        const newTime = ratio * duration;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const handleSpeedChange = s => {
        setSpeed(s);
        audioRef.current.playbackRate = s;
        setShowSpeed(false);
    };

    const handleVolume = e => {
        const val = parseFloat(e.target.value);
        setVolume(val);
        audioRef.current.volume = val;
        setIsMuted(val === 0);
    };

    const toggleMute = () => {
        const audio = audioRef.current;
        if (isMuted) {
            audio.volume = volume || 0.5;
            setIsMuted(false);
        } else {
            audio.volume = 0;
            setIsMuted(true);
        }
    };

    const handleSongEnd = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const progress = duration ? (currentTime / duration) * 100 : 0;

    if (!song) return null;

    return (
        <div className={`player ${isMinimized ? 'player--minimized' : ''}`}>
            {/* Toggle button for mobile/tablet */}
            <button
                className='player__toggle-btn'
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand Player' : 'Minimize Player'}>
                <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' width='16' height='16'>
                    {isMinimized ? (
                        <polyline points='18 15 12 9 6 15' /> // Up arrow
                    ) : (
                        <polyline points='6 9 12 15 18 9' /> // Down arrow
                    )}
                </svg>
            </button>
            <audio
                ref={audioRef}
                src={song.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />

            {/* Poster + Info */}
            <div className='player__info'>
                <img className='player__poster' src={song.posterUrl} alt={song.title} />
                <div className='player__meta'>
                    <p className='player__title'>{song.title}</p>
                    <span className='player__mood'>{song.mood}</span>
                </div>
            </div>

            {/* Progress bar */}
            <div className='player__progress-wrap'>
                <span className='player__time'>{formatTime(currentTime)}</span>
                <div className='player__progress' ref={progressRef} onClick={handleProgressClick}>
                    <div className='player__progress-fill' style={{ width: `${progress}%` }} />
                    <div className='player__progress-thumb' style={{ left: `${progress}%` }} />
                </div>
                <span className='player__time'>{formatTime(duration)}</span>
            </div>

            {/* Controls */}
            <div className='player__controls'>
                {/* Speed picker */}
                <div className='player__speed-wrap'>
                    <button
                        className='player__btn player__btn--speed'
                        onClick={() => setShowSpeed(!showSpeed)}
                        title='Playback speed'>
                        {speed}×
                    </button>
                    {showSpeed && (
                        <div className='player__speed-menu'>
                            {SPEED_OPTIONS.map(s => (
                                <button
                                    key={s}
                                    className={`player__speed-option ${s === speed ? 'active' : ''}`}
                                    onClick={() => handleSpeedChange(s)}>
                                    {s}×
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Backward 5s */}
                <button className='player__btn player__btn--skip' onClick={() => skip(-5)} title='Back 5s'>
                    <img src={skipBackIcon} alt='Back' width='20' height='20' />
                    <span>5s</span>
                </button>

                {/* Play / Pause */}
                <button
                    className='player__btn player__btn--play'
                    onClick={togglePlay}
                    title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? (
                        <img src={pauseIcon} alt='Pause' width='28' height='28' />
                    ) : (
                        <img src={playIcon} alt='Play' width='28' height='28' />
                    )}
                </button>

                {/* Forward 5s */}
                <button className='player__btn player__btn--skip' onClick={() => skip(5)} title='Forward 5s'>
                    <span>5s</span>
                    <img src={skipForwardIcon} alt='Forward' width='20' height='20' />
                </button>

                {/* Volume */}
                <div className='player__volume'>
                    <button className='player__btn player__btn--vol' onClick={toggleMute} title='Mute'>
                        {isMuted || volume === 0 ? (
                            <img src={muteIcon} alt='Mute' width='20' height='20' />
                        ) : (
                            <img src={volumeIcon} alt='Volume' width='20' height='20' />
                        )}
                    </button>
                    <input
                        type='range'
                        min='0'
                        max='1'
                        step='0.05'
                        value={isMuted ? 0 : volume}
                        onChange={handleVolume}
                        className='player__volume-slider'
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;
