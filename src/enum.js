export const PLAYER_STATE = Object.freeze({
  READY: 0,
  LOADING: 1,
  PLAYING: 2,
  PAUSED: 3,
  FAILED: 4,
  DESTROYED: 5,
});

export const PLAYER_MODE = Object.freeze({
  Audio: 'audio',
  AudioContext: 'actx',
});
