import { PLAYER_STATE, onStateChange, PlayerxConstructorOptions } from './common';

export interface AudioPlayer {
  ins: HTMLAudioElement,

  onStateChange: onStateChange | null | undefined,

  resource: string,

  state: PLAYER_STATE,

  runner: HTMLAudioElement,

  play: (resource: string | undefined) => Promise<PLAYER_STATE | undefined>,

  pause: () => void
}

export interface AudioPlayerConstructor {
  new(options?: PlayerxConstructorOptions): AudioPlayer
}

declare let AudioPlayer: AudioPlayerConstructor;

export default AudioPlayer;
