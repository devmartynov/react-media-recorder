import { useRef, useState } from 'react';
import useTimer from './useTimer';

export enum RecordingStatusEnum {
    INACTIVE = -1,
    RECORDING = 1,
    PAUSED = 0,
}

export enum ResultCodeEnum {
    SUCCESS = 0,
    FAILURE = 1,
}

type TRecordingCallback = () => Promise<Error | ResultCodeEnum>;

export interface IUseMediaRecorderOutput {
    startRecording: TRecordingCallback,
    stopRecording: TRecordingCallback,
    pauseRecording: TRecordingCallback,
    resumeRecording: TRecordingCallback,
    status: RecordingStatusEnum
    recording: string
    timer: number
}

const useMediaRecorder = () : IUseMediaRecorderOutput => {
    const [status, setStatus] = useState<RecordingStatusEnum>(RecordingStatusEnum.INACTIVE);
    const [recording, setRecording] = useState<any>(null);
    const recorder = useRef<MediaRecorder | null>(null);
    const stream = useRef<MediaStream | null>(null);
    const recordingChunks = useRef<BlobEvent[]>([]);

    const {
        handleStartTimer,
        handleResetTimer,
        handlePauseTimer,
        handleResumeTimer,
        timer,
    } = useTimer();

    const checkMediaDevicesApiSupport = (): boolean => Boolean(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);

    const isRecording = (): boolean => status === RecordingStatusEnum.RECORDING;

    const isPaused = (): boolean => status === RecordingStatusEnum.PAUSED;

    const startRecording = async (): Promise<Error | ResultCodeEnum> => {
        if (!checkMediaDevicesApiSupport()) {
            return new Error('MediaDevices API or getUserMedia method is not supported in this browser.');
        }

        if (isRecording()) {
            return new Error('Recording is in progress!');
        }

        let resultCode = ResultCodeEnum.SUCCESS;

        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                audio: true,
            });
            recorder.current = new MediaRecorder(mediaStream);
            stream.current = mediaStream;
            recorder.current.start();
            recorder.current.onstart = () => {
                handleStartTimer();
                setStatus(RecordingStatusEnum.RECORDING);
            };
            recorder.current.ondataavailable = (event: BlobEvent) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                recordingChunks.current.push(event.data);
            };
        } catch (error) {
            console.error(error.name + ': ' + error.message);
            resultCode = ResultCodeEnum.FAILURE;
        }

        return resultCode;
    };

    const pauseRecording = async (): Promise<Error | ResultCodeEnum> => {
        if (!isRecording()) {
            return new Error('Recording isn\'t in progress!');
        }

        if (!recorder.current || !stream.current) {
            return new Error('No recorder or stream are used');
        }

        recorder.current.pause();
        recorder.current.onpause = () => {
            handlePauseTimer();
            setStatus(RecordingStatusEnum.PAUSED);
        };

        return ResultCodeEnum.SUCCESS;
    };

    const resumeRecording = async (): Promise<Error | ResultCodeEnum> => {
        if (isRecording()) {
            return new Error('Recording is in progress!');
        }

        if (!isPaused()) {
            return new Error('Failed to execute \'resume\' on \'MediaRecorder\': The MediaRecorder\'s state is \'inactive\'');
        }

        if (!recorder.current || !stream.current) {
            return new Error('No recorder or stream are used');
        }

        recorder.current.resume();
        recorder.current.onresume = () => {
            handleResumeTimer();
            setStatus(RecordingStatusEnum.RECORDING);
        };

        return ResultCodeEnum.SUCCESS;
    };

    const stopRecording = async (): Promise<Error | ResultCodeEnum> => {
        if (!isRecording()) {
            return new Error('Recording isn\'t in progress!');
        }

        if (!recorder.current || !stream.current) {
            return new Error('No recorder or stream are used');
        }

        let recordingBlob = null;

        recorder.current.stop();
        recorder.current.onstop = () => {
            handleResetTimer();
            setStatus(RecordingStatusEnum.INACTIVE);

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore // todo
            recordingBlob = new Blob(recordingChunks.current, { type: 'audio/wav;' });
            recordingChunks.current = [];
            setRecording(window.URL.createObjectURL(recordingBlob));
            stream?.current?.getAudioTracks()?.forEach((track: MediaStreamTrack) => {
                track.stop();
            });
        };

        return ResultCodeEnum.SUCCESS;
    };

    return {
        startRecording,
        pauseRecording,
        resumeRecording,
        stopRecording,
        recording,
        status,
        timer,
    };
};

export default useMediaRecorder;
