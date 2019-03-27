export enum PLAYER_STATE {
  READY = 0,
  LOADING,
  PLAYING,
  PAUSED,
  FAILED,
  DESTROYED
}

export enum PLAYER_MODE {
  Audio = 0,
  AudioContext
}

export type onStateChange = (value: PLAYER_STATE) => any;

export interface PlayerxConstructorOptions {
  onStateChange?: onStateChange
}
