import { useEffect, useRef, useState } from 'react';
import { detect, init } from '../utils/utils';
import cameraIcon from '../../../assets/camera.svg';
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
                <img src={cameraIcon} alt='Camera' width='18' height='18' />
                Detect Mood
            </button>

            <p className='camera-section__hint'>Look at the camera and click to analyse your expression</p>
        </div>
    );
}
