export enum PLAYER_STATE {
  READY,
  LOADING,
  PLAYING,
  PAUSED,
  FAILED,
  DESTROYED
}

export enum PLAYER_MODE {
  Audio = 'audio',
  AudioContext = 'actx'
}

export type onStateChange = (value: PLAYER_STATE) => any;

export interface PlayerxConstructorOptions {
  onStateChange?: onStateChange
}
