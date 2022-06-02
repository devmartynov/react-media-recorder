import React from 'react';
import { RecordingStatusEnum, IUseMediaRecorderOutput } from '@devmartynov/react-media-recorder';

interface IAudioViewProps extends IUseMediaRecorderOutput {}

export default function AudioView({recording, timer, status, pauseRecording, resumeRecording, startRecording, stopRecording}: IAudioViewProps) {

    return (
        <div className='container'>
            <div className='inner-container'>
                <audio controls src={recording}/>
                <p
                    className={`timer ${
                        status === RecordingStatusEnum.PAUSED ? 'blink-animation' : ''
                    }`}
                >
                    {new Date(timer * 1000).toISOString().substring(11, 19)}
                </p>
                <div className='buttons'>
                    <button
                        className='btn-play'
                        onClick={
                            status === RecordingStatusEnum.RECORDING
                                ? pauseRecording
                                : resumeRecording
                        }
                    >
                        {status === RecordingStatusEnum.RECORDING ? '⏸' : '▶️'}
                    </button>
                    <button className='btn-record' onClick={startRecording}>
                        🎤
                    </button>
                    <button className='btn-stop' onClick={stopRecording}>
                        ⏹
                    </button>
                </div>
            </div>
        </div>
    )
}
