import React from 'react';
import {ReactMediaRecorder} from '@devmartynov/react-media-recorder';
import AudioView from './AudioView';

function ClassVersion() {
    return (
        <ReactMediaRecorder
            render={({
                         timer,
                         stopRecording,
                         startRecording,
                         pauseRecording,
                         resumeRecording,
                         recording,
                         status,
                     }) => {

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
            }}
        />
    );
}

export default ClassVersion;
