import React, { useState, useRef, useEffect } from 'react';
import { useUpload } from '../hooks/useUpload';
import { Link } from 'react-router';
import '../styles/upload.scss';

// Assets
import arrowLeft from '../../../assets/arrow-left.svg';
import errorCircle from '../../../assets/error-circle.svg';
import checkCircle from '../../../assets/check-circle.svg';
import uploadIcon from '../../../assets/upload.svg';
import musicNote from '../../../assets/music-note.svg';
import closeIcon from '../../../assets/close.svg';
import chevronDown from '../../../assets/chevron-down.svg';

// Available moods mapping matching backend ENUMs
const MOOD_OPTIONS = [
    { value: 'happy', label: 'Happy 😄' },
    { value: 'sad', label: 'Sad 😢' },
    { value: 'surprised', label: 'Surprised 😲' },
];

export default function Upload() {
    const { loading, error, success, handleUpload, resetState } = useUpload();

    const [file, setFile] = useState(null);
    const [mood, setMood] = useState('happy');
    const [isDragActive, setIsDragActive] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const fileInputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleFileChange = e => {
        resetState();
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === 'audio/mpeg') {
            setFile(selectedFile);
        } else if (selectedFile) {
            alert('Please select a valid .mp3 file');
        }
    };

    const handleRemoveFile = () => {
        setFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        resetState();
    };

    const handleDragEnter = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(true);
    };

    const handleDragLeave = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = e => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        resetState();

        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'audio/mpeg') {
            setFile(droppedFile);
        } else if (droppedFile) {
            alert('Please drop a valid .mp3 file');
        }
    };

    const onSubmit = async e => {
        e.preventDefault();
        if (!file) return;

        const isSuccess = await handleUpload(file, mood);
        if (isSuccess) {
            // Optional: clear file completely after success, or leave it so they can see success state
            setFile(null);
            setMood('happy');
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <main className='upload-page'>
            <div className='upload-card'>
                <Link to='/' className='upload-card__back'>
                    <img src={arrowLeft} alt='Back' width='16' height='16' />
                    Back to Home
                </Link>

                <div className='upload-card__header'>
                    <div className='upload-card__brand'>
                        <img src='/logo.svg' alt='MoodSync Logo' width='42' height='42' />
                    </div>
                    <h1>Upload Song</h1>
                    <p>Add a new .mp3 track to exactly the right mood.</p>
                </div>

                <form className='upload-card__form' onSubmit={onSubmit}>
                    {/* Alert Messages */}
                    {error && (
                        <div className='upload-card__alert upload-card__alert--error'>
                            <img src={errorCircle} alt='Error' width='18' height='18' />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className='upload-card__alert upload-card__alert--success'>
                            <img src={checkCircle} alt='Success' width='18' height='18' />
                            Song uploaded successfully!
                        </div>
                    )}

                    {/* File Dropzone */}
                    {!file ? (
                        <div
                            className={`upload-card__dropzone ${isDragActive ? 'upload-card__dropzone--active' : ''}`}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}>
                            <img src={uploadIcon} alt='Upload' width='40' height='40' />
                            <p className='dropzone-text'>
                                <span>Click to browse</span> or drag and drop
                            </p>
                            <p className='dropzone-subtext'>MP3 ONLY • INCLUDES EMBEDDED COVER IMAGE</p>

                            <input type='file' accept='audio/mpeg' onChange={handleFileChange} ref={fileInputRef} />
                        </div>
                    ) : (
                        <div className='upload-card__selected-file'>
                            <div className='file-info'>
                                <img src={musicNote} alt='Music' width='24' height='24' />
                                <span className='file-name' title={file.name}>
                                    {file.name}
                                </span>
                            </div>
                            <button
                                type='button'
                                className='remove-btn'
                                onClick={handleRemoveFile}
                                title='Remove file'
                                disabled={loading}>
                                <img src={closeIcon} alt='Remove' width='16' height='16' />
                            </button>
                        </div>
                    )}

                    {/* Custom Mood Select */}
                    <div className='upload-card__group' ref={dropdownRef}>
                        <label>Song Mood</label>
                        <div className={`custom-select ${isDropdownOpen ? 'custom-select--open' : ''}`}>
                            <div
                                className='custom-select__trigger'
                                onClick={() => !loading && setIsDropdownOpen(!isDropdownOpen)}>
                                <span>{MOOD_OPTIONS.find(opt => opt.value === mood)?.label}</span>
                                <img src={chevronDown} alt='Select' width='14' height='14' />
                            </div>

                            {isDropdownOpen && (
                                <div className='custom-select__options'>
                                    {MOOD_OPTIONS.map(opt => (
                                        <div
                                            key={opt.value}
                                            className={`custom-option ${mood === opt.value ? 'custom-option--selected' : ''}`}
                                            onClick={() => {
                                                setMood(opt.value);
                                                setIsDropdownOpen(false);
                                            }}>
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button type='submit' className='upload-card__submit' disabled={!file || loading}>
                        {loading ? (
                            <>
                                <span className='spinner' />
                                Uploading...
                            </>
                        ) : (
                            'Upload File'
                        )}
                    </button>
                </form>
            </div>
        </main>
    );
}
