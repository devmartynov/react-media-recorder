# @devmartynov/react-media-recorder [![NPM](https://img.shields.io/npm/v/@devmartynov/react-media-recorder)](https://www.npmjs.com/package/@devmartynov/react-media-recorder)

> audio/video recorder which is used [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), [Media Stream API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream), [Media Devices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)

#### In progress:
- [ ] Video format support


## Install

```bash
npm install --save @devmartynov/react-media-recorder
```
or
```
yarn add @devmartynov/react-media-recorder
```

## Props

| Property name   | Type   | Return type | Default                      | Description                                     |
|-----------------| ------ |-------------|------------------------------|-------------------------------------------------|
| status          | string | -           | RecordingStatusEnum.INACTIVE | RecordingStatusEnum.(INACTIVE,RECORDING,PAUSED) |
| recording       | string | -           | -                            | Result blob url.                                |
| timer           | number | -           | -                            | Record timer (in secs).                         |
| startRecording  | method | Promise     | -                            | Call this method to start recording.            |
| stopRecording   | method | Promise     | -                            | Call this method to stop recording.             |
| pauseRecording  | method | Promise     | -                            | Call this method to pause recording.            |
| resumeRecording | method | Promise     | -                            | Call this method to resume recording.           |

## Usage (Class Version)

```tsx
import React, { Component } from 'react'

import { ReactMediaRecorder } from '@devmartynov/react-media-recorder';

class Example extends Component {
    render() {
        return (
            <ReactAudioRecorder
                render={({
                    timer,
                    stopRecording,
                    startRecording,
                    resumeRecording,
                    pauseRecording,
                    recording,
                    status,
                }) => (
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
                )}
            />
        )
    }
}
```

## Usage (Hooks Version)

```tsx
import React from 'react'

import { useMediaRecorder } from '@devmartynov/react-media-recorder';

function Example() {
    const {
        recording,
        timer,
        startRecording,
        stopRecording,
        pauseRecording,
        resumeRecording,
        status,
    } = useAudioRecorder();

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
    );
}
```

This project is based on [@sarafhbk/react-audio-recorder](https://github.com/sarafhbk/react-audio-recorder) but extends its functionality.

## License

MIT © [devmartynov](https://github.com/devmartynov)

