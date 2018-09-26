"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * The class provides in the request to interact with database.
 */
class SessionData {
    get session() {
        return this.sessionToken.session;
    }
    constructor(sessionToken) {
        this.sessionToken = sessionToken;
    }
}
exports.SessionData = SessionData;
exports.default = SessionData;
//# sourceMappingURL=sessionData.js.map