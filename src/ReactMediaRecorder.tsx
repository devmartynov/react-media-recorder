import { ReactElement } from 'react';
import useMediaRecorder, { IUseMediaRecorderOutput } from './useMediaRecorder';

export const ReactMediaRecorder = ({render}: {render: ({
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    recording,
    timer,
}: IUseMediaRecorderOutput) => ReactElement
}) => {
    const {
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
        recording,
        timer,
    } = useMediaRecorder();

    return render({
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
        recording,
        timer,
    });
};
