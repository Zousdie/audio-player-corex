import { PLAYER_STATE, PLAYER_MODE, onStateChange } from './common';
import AudioPlayer from './audio';
import ACTXPlayer from './actx';

declare function Playerx ({ mode, onStateChange }: { mode: PLAYER_MODE.Audio, onStateChange?: onStateChange }): AudioPlayer
declare function Playerx ({ mode, onStateChange }: { mode: PLAYER_MODE.AudioContext, onStateChange?: onStateChange }): ACTXPlayer

export default Playerx;
export {
  PLAYER_STATE,
  PLAYER_MODE,
  onStateChange,
  AudioPlayer,
  ACTXPlayer,
};
