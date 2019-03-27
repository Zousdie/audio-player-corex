import { PLAYER_STATE, onStateChange, PlayerxConstructorOptions } from './common';

export interface ACTXPlayer {
  ins: AudioContext,

  onStateChange: onStateChange | null,

  state: PLAYER_STATE,

  runner: AudioContext,

  play: (buffer: ArrayBuffer) => Promise<PLAYER_STATE | undefined>,

  stop: () => void

  close: () => void
}

export interface ACTXPlayerConstructor {
  new(options?: PlayerxConstructorOptions): ACTXPlayer
}

declare let ACTXPlayer: ACTXPlayerConstructor;

export default ACTXPlayer;
