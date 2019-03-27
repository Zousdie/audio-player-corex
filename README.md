# audio-playerx

Core audio player in the browser

## Installation

```shell
npm install audio-playerx
```

or

```shell
yarn add audio-playerx
```

## Usage

audio-playerx support two modes.

### HTMLAudioElement

```javascript
import Playerx, { PLAYER_STATE, PLAYER_MODE } from "audio-playerx";

// initialization
const player = new Playerx({
  mode: PLAYER_MODE.Audio,
  onStateChange(value) {
    console.log(value);
  }
});

// play your audio
player.play(resource: string);

// pause
player.pause();

// play continue
player.play();
```

### Web Audio API

```javascript
import Playerx, { PLAYER_STATE, PLAYER_MODE } from "audio-playerx";

// initialization
const player = new Playerx({
  mode: PLAYER_MODE.AudioContext,
  onStateChange(value) {
    console.log(value);
  }
});

// play your audio
player.play(buffer: ArrayBuffer);

// stop
player.stop();

// close player
player.close();
```

## API

### AudioPlayer

```javascript
import { AudioPlayer } from "audio-playerx";

new AudioPlayer();

// is equal to

new Playerx({ mode: PLAYER_MODE.Audio });
```

- Support play, pause and resume

#### Constructor

```typescript
new ({ onStateChange?: onStateChange } = {}): AudioPlayer;
```

onStateChange is a callback, called when the player state changes.

```typescript
type onStateChange: (value: PLAYER_STATE) => any;
```

#### Methods

```typescript
play: (resource: string | undefined) => Promise<PLAYER_STATE | undefined>
```

audio play and resume.

_When the parameter 'resource' is passed, it will start playing from the beginning, otherwise it is used to continue playing the paused audio._

```typescript
pause: () => void
```

### ACTXPlayer

```javascript
import { ACTXPlayer } from "audio-playerx";

new ACTXPlayer();

// is equal to

new Playerx({ mode: PLAYER_MODE.AudioContext });
```

- Only supports play, stop
- **doesn't support pause, resume**

#### Constructor

```typescript
new ({ onStateChange?: onStateChange } = {}): AudioPlayer;
```

onStateChange is a callback, called when the player state changes.

```typescript
type onStateChange: (value: PLAYER_STATE) => any;
```

#### Methods

```typescript
play: (buffer: ArrayBuffer) => Promise<PLAYER_STATE | undefined>,
```

```typescript
stop: () => void
```

```typescript
close: () => void
```

### PLAYER_MODE

player mode enum

```javascript
{
  Audio: 0,
  AudioContext: 1,
}
```

### PLAYER_STATE

player state enum

```javascript
{
  READY: 0,
  LOADING: 1,
  PLAYING: 2,
  PAUSED: 3,
  FAILED: 4,
  DESTROYED: 5,
}
```
