import { PLAYER_STATE, onStateChange, PlayerxConstructorOptions } from './common';

export default class ACTXPlayer {
  readonly ins: AudioContext

  readonly runner: AudioContext

  readonly state: PLAYER_STATE

  onStateChange?: onStateChange

  resource?: string

  constructor ({ onStateChange }?: PlayerxConstructorOptions)

  play: (buffer: ArrayBuffer) => Promise<PLAYER_STATE | undefined>

  stop: () => void

  close: () => void
}
