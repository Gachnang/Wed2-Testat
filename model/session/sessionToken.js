"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/***
 * Representing the sessionId
 */
class SessionToken {
    get session() {
        return this._id;
    }
    set session(session) {
        this._id = session;
    }
    constructor(session, created = new Date()) {
        this.session = session;
        this.created = created;
        this.lastseen = this.created;
    }
}
exports.SessionToken = SessionToken;
//# sourceMappingURL=sessionToken.js.map