import {SessionToken} from "./sessionToken";
import {Options} from "../options";
import {OptionsStore} from "../optionsStore";

/**
 * The class provided in the request to interact with database.
 * Before interacting with a instance of this class, make sure to check isInizialised or call init()!
 */
export class SessionData {
  private _isInizialised: boolean = false;
  get isInizialised(): boolean {
    return this._isInizialised;
  }

  sessionToken: SessionToken;
  get session(): string {
    return this.sessionToken.session;
  }

  private _optionsStore: OptionsStore;
  options: Options;
  saveOptions(callback: (err: Error, option: Options) => void) {
    this._optionsStore.set(this.options, callback);
  }

  constructor(sessionToken: SessionToken) {
    this.sessionToken = sessionToken;

    this._optionsStore = new OptionsStore(this.session);
  }

  async init(): Promise<SessionData> {
    let _this = this;
    return new Promise((resolve: (sessionData: SessionData) => void, reject: (error: Error) => void) => {
      if (_this._isInizialised) {
        resolve(_this);
      } else {
        _this._optionsStore.get((err: Error, option: Options) => {
          if (err) {
            reject(err);
          } else {
            _this.options = option;
            resolve(_this);
          }
        })
      }
    });
  }
}
export default SessionData;