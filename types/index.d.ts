import { PLAYER_STATE, PLAYER_MODE, onStateChange } from './common';
import { AudioPlayer } from './audio';
import { ACTXPlayer } from './actx';

type Playerx = (options: {
  mode: PLAYER_MODE,
  onStateChange?: onStateChange
}) => never | AudioPlayer | ACTXPlayer;

export default Playerx;
export {
  PLAYER_STATE,
  PLAYER_MODE,
  onStateChange,
  AudioPlayer,
  ACTXPlayer,
};
