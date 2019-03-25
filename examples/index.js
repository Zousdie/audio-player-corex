import Playerx, { PLAYER_STATE, PLAYER_MODE } from '../src/index';

const input = document.getElementById('src');
const btnPlay = document.getElementById('play');
const btnPause = document.getElementById('pause');

const player = new Playerx({
  mode: PLAYER_MODE.Audio,
  onStateChange (v) {
    console.log(v);
  },
});

let src = '';

btnPlay.onclick = () => {
  if (player.state === PLAYER_STATE.PAUSED && input.value === src) {
    player.play().then(r => console.log(r)).catch(e => console.log(e));
  } else {
    src = input.value;
    player.play(src).then(r => console.log(r)).catch(e => console.log(e));
  }
};
btnPause.onclick = () => {
  player.pause();
};
