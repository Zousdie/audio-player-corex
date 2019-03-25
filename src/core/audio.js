import PLAYER_STATE from '../state';

const EMPTY_AUDIO = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA=';

export default class AudioPlayer {
  _state = PLAYER_STATE.READY;

  _p = null;

  _resolve = null;

  _reject = null;

  _cancelBuffer = null;

  ins = new Audio();

  onStateChange = null;

  get resource () {
    return this.ins.src;
  }

  set resource (value) {
    this.ins.src = value;
  }

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

    const { ins } = this;

    ins.onerror = (error) => {
      // abort
      if (this.resource === EMPTY_AUDIO) {
        return;
      }

      this.state = PLAYER_STATE.FAILED;

      if (this._reject) {
        this._reject(error);
      }
    };

    ins.onloadstart = () => {
      // abort
      if (this.resource === EMPTY_AUDIO) {
        return;
      }

      this.state = PLAYER_STATE.LOADING;
    };

    ins.oncanplaythrough = () => {
      // abort
      if (this.resource === EMPTY_AUDIO) {
        return;
      }

      ins.play();
    };

    ins.onplay = () => {
      this.state = PLAYER_STATE.PLAYING;
    };

    ins.onended = () => {
      this.state = PLAYER_STATE.READY;

      if (this._resolve) {
        this._resolve(this.state);
      }
    };

    ins.onpause = () => {
      this.state = PLAYER_STATE.PAUSED;
    };

    ins.onwaiting = () => {
      this.state = PLAYER_STATE.LOADING;
    };

    ins.onplaying = () => {
      this.state = PLAYER_STATE.PLAYING;
    };
  }

  play (resource = null) {
    if (this.state === PLAYER_STATE.LOADING && this.resource === resource && this.ins.currentTime === 0) {
      return this._p;
    }

    if (this.state === PLAYER_STATE.PAUSED && resource === null) {
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

    if (this.state !== PLAYER_STATE.READY && this._resolve) {
      this._resolve(this.state);
    }

    this._p = new Promise((r, j) => {
      this._resolve = r;
      this._reject = j;
    });

    if (this.state === PLAYER_STATE.READY && this.resource === resource) {
      this.ins.currentTime = 0;
      this.ins.play();
    } else {
      this.resource = resource;
      this.ins.load();
    }

    return this._p;
  }

  pause () {
    switch (this.state) {
      case PLAYER_STATE.PLAYING:
        this.ins.pause();
        break;

      case PLAYER_STATE.LOADING:
        this.state = PLAYER_STATE.PAUSED;
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
      this._resolve(this.state);
    }
  }
}
