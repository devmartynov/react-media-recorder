import React from 'react';
import {useMediaRecorder} from '@devmartynov/react-media-recorder';
import AudioView from './AudioView';

function HooksVersion() {
    const {
        recording,
        timer,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
    } = useMediaRecorder();

    return (
        <AudioView
            status={status}
            recording={recording}
            timer={timer}
            startRecording={startRecording}
            stopRecording={stopRecording}
            pauseRecording={pauseRecording}
            resumeRecording={resumeRecording}
        />
    );
}

export default HooksVersion;
