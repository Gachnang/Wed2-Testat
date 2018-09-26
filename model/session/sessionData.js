"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const optionsStore_1 = require("../optionsStore");
/**
 * The class provided in the request to interact with database.
 * Before interacting with a instance of this class, make sure to check isInizialised or call init()!
 */
class SessionData {
    constructor(sessionToken) {
        this._isInizialised = false;
        this.sessionToken = sessionToken;
        this._optionsStore = new optionsStore_1.OptionsStore(this.session);
    }
    get isInizialised() {
        return this._isInizialised;
    }
    get session() {
        return this.sessionToken.session;
    }
    saveOptions(callback) {
        this._optionsStore.set(this.options, callback);
    }
    async init() {
        let _this = this;
        return new Promise((resolve, reject) => {
            if (_this._isInizialised) {
                resolve(_this);
            }
            else {
                _this._optionsStore.get((err, option) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        _this.options = option;
                        resolve(_this);
                    }
                });
            }
        });
    }
}
exports.SessionData = SessionData;
exports.default = SessionData;
//# sourceMappingURL=sessionData.js.map