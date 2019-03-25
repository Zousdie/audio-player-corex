import PLAYER_STATE from '../state';

export default class ACTXPlayer {
  _state = PLAYER_STATE.READY;

  _sourceNode = null;

  _resolve = null;

  _reject = null;

  ins = new (window.AudioContext || window.webkitAudioContext)();

  onStateChange = null;

  get state () {
    return this._state;
  }

  set state (value) {
    if (typeof this.onStateChange === 'function' && value !== this._state) {
      this.onStateChange(value);
    }

    this._state = value;
  }

  get runner () {
    return this.ins;
  }

  constructor ({ onStateChange }) {
    this.onStateChange = onStateChange;
  }

  play (buffer) {
    this.stop();

    const p = new Promise((r, j) => {
      this._resolve = r;
      this._reject = j;
    });

    this.state = PLAYER_STATE.LOADING;
    const _sourceNode = this.runner.createBufferSource();
    this._sourceNode = _sourceNode;

    this.runner.decodeAudioData(
      buffer,
      (data) => {
        if (_sourceNode !== this._sourceNode) {
          return;
        }

        _sourceNode.onended = () => {
          this.state = PLAYER_STATE.END;
          if (this._resolve) {
            this._resolve(this.state);
          }
        };
        _sourceNode.buffer = data;
        _sourceNode.connect(this.runner.destination);
        _sourceNode.start(0);
        this.state = PLAYER_STATE.PLAYING;
      },
      (error) => {
        this.state = PLAYER_STATE.FAILED;
        if (this._reject) {
          this._reject(error);
        }
      },
    );

    return p;
  }

  stop () {
    this.state = PLAYER_STATE.READY;
    if (this._sourceNode) {
      this._sourceNode.stop();
    }
    if (this._resolve) {
      this._resolve(this.state);
    }
  }

  close () {
    this.stop();
    this.runner.close();
    this._sourceNode = null;
    this._reject = null;
    this._resolve = null;
    this.ins = null;
    this.state = PLAYER_STATE.DESTROYED;
  }
}
