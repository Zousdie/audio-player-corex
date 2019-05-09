import { PLAYER_STATE } from '../enum';

const EMPTY_AUDIO = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';

export default class AudioPlayer {
  _p = null;

  _resolve = null;

  _reject = null;

  _cancelBuffer = null;

  ins = new Audio();

  state = PLAYER_STATE.READY;

  onStateChange = null;

  get _state () {
    return this.state;
  }

  set _state (value) {
    if (typeof this.onStateChange === 'function' && value !== this.state) {
      this.state = value;
      this.onStateChange(value);
    }
  }

  get runner () {
    return this.ins;
  }

  get resource () {
    return this.ins.src;
  }

  set resource (value) {
    this.ins.src = value;
  }

  constructor ({ onStateChange } = { onStateChange: undefined }) {
    this.onStateChange = onStateChange;

    const { ins } = this;

    ins.onerror = (error) => {
      // abort
      if (this.resource === EMPTY_AUDIO) {
        return;
      }

      this._state = PLAYER_STATE.FAILED;

      if (this._reject) {
        this._reject(error);
      }
    };

    ins.onloadstart = () => {
      // abort
      if (this.resource === EMPTY_AUDIO) {
        return;
      }

      this._state = PLAYER_STATE.LOADING;
    };

    ins.oncanplay = () => {
      // abort
      if (this.resource === EMPTY_AUDIO) {
        return;
      }

      ins.play();
    };

    ins.onplay = () => {
      this._state = PLAYER_STATE.PLAYING;
    };

    ins.onended = () => {
      this._state = PLAYER_STATE.READY;

      if (this._resolve) {
        this._resolve(this._state);
      }
    };

    ins.onpause = () => {
      this._state = PLAYER_STATE.PAUSED;
    };

    ins.onwaiting = () => {
      this._state = PLAYER_STATE.LOADING;
    };

    ins.onplaying = () => {
      this._state = PLAYER_STATE.PLAYING;
    };
  }

  play (resource = null) {
    if (this._state === PLAYER_STATE.LOADING && this.resource === resource && this.ins.currentTime === 0) {
      return this._p;
    }

    if (this._state === PLAYER_STATE.PAUSED && resource === null) {
      this._p = new Promise((r, j) => {
        this._resolve = r;
        this._reject = j;
      });

      if (this.resource === EMPTY_AUDIO) {
        this.resource = this._cancelBuffer;
        this.ins.load();
      } else {
        this.ins.play();
      }

      return this._p;
    }

    if (this._state !== PLAYER_STATE.READY && this._resolve) {
      this._resolve(this._state);
    }

    this._p = new Promise((r, j) => {
      this._resolve = r;
      this._reject = j;
    });

    if (this._state === PLAYER_STATE.READY && this.resource === resource) {
      this.ins.currentTime = 0;
      this.ins.play();
    } else {
      this.resource = resource;
      this.ins.load();
    }

    return this._p;
  }

  pause () {
    switch (this._state) {
      case PLAYER_STATE.PLAYING:
        this.ins.pause();
        break;

      case PLAYER_STATE.LOADING:
        this._state = PLAYER_STATE.PAUSED;
        this._cancelBuffer = this.resource;
        this.resource = EMPTY_AUDIO;
        break;

      case PLAYER_STATE.FAILED:
      case PLAYER_STATE.PAUSED:
      case PLAYER_STATE.READY:
      default:
        return;
    }

    if (this._resolve) {
      this._resolve(this._state);
    }
  }
}
