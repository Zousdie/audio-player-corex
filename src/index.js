import PLAYER_STATE from './state';
import PLAYER_MODE from './mode';
import AudioPlayer from './core/audio';
import ACTXPlayer from './core/actx';

function Playerx (options) {
  const { mode } = options;

  if (mode === PLAYER_MODE.Audio) {
    return new AudioPlayer(options);
  }

  if (mode === PLAYER_MODE.AudioContext) {
    return new ACTXPlayer(options);
  }

  throw new Error('Invalid options parameter: mode');
}

export default Playerx;
export { PLAYER_STATE, PLAYER_MODE };
