import { PLAYER_STATE, onStateChange, PlayerxConstructorOptions } from './common';

export default class AudioPlayer {
  readonly ins: HTMLAudioElement

  readonly runner: HTMLAudioElement

  readonly state: PLAYER_STATE

  onStateChange?: onStateChange

  resource?: string

  constructor ({ onStateChange }?: PlayerxConstructorOptions)

  play: (resource?: string) => Promise<PLAYER_STATE | undefined>

  pause: () => void
}
