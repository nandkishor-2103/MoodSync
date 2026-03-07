import { useEffect, useRef, useState } from 'react';
import { detect, init } from '../utils/utils';
import './faceExpression.scss';

export default function FaceExpression({ onClick = () => {} }) {
    const videoRef = useRef(null);
    const landmarkerRef = useRef(null);
    const streamRef = useRef(null);

    const [expression, setExpression] = useState(null);

    useEffect(() => {
        init({ landmarkerRef, videoRef, streamRef });

        return () => {
            if (landmarkerRef.current) {
                landmarkerRef.current.close();
            }
            if (videoRef.current?.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    function handleClick() {
        const detected = detect({ landmarkerRef, videoRef, setExpression });
        console.log('Detected expression:', detected);
        if (detected) {
            onClick(detected);
        }
    }

    return (
        <div className='camera-section'>
            {/* Top label */}
            <p className='camera-section__label'>Mood Detection</p>

            {/* Camera frame */}
            <div className='camera-section__frame'>
                <div className='camera-section__frame-inner' />

                {/* Live dot */}
                <div className='camera-section__live'>
                    <span className='dot' />
                    Live
                </div>

                <video ref={videoRef} className='camera-section__video' playsInline />
            </div>

            {/* Expression display */}
            <div className='camera-section__expression'>
                {expression ? (
                    <>
                        <span className='camera-section__mood-label'>{expression}</span>
                        <span className='camera-section__mood-badge'>Detected</span>
                    </>
                ) : (
                    <span className='camera-section__mood-label' style={{ color: '#555' }}>
                        No expression detected yet
                    </span>
                )}
            </div>

            {/* Detect button */}
            <button className='camera-section__detect-btn' onClick={handleClick}>
                {/* Camera icon */}
                <svg
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    width='18'
                    height='18'>
                    <path d='M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z' />
                    <circle cx='12' cy='13' r='4' />
                </svg>
                Detect Mood
            </button>

            <p className='camera-section__hint'>Look at the camera and click to analyse your expression</p>
        </div>
    );
}
