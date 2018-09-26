"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = require("nedb");
const sessionToken_1 = require("./sessionToken");
/**
 * Store for SessionTokens
 */
class SessionStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/session.db', autoload: true });
    }
    /**
     * Add a new SessionToken with given session to store
     * @param session sessionId
     * @param callback
     */
    add(session, callback) {
        this.db.insert(new sessionToken_1.SessionToken(session), callback);
    }
    /**
     * Get SessionToken with given session from store
     * @param session sessionId
     * @param callback
     */
    get(session, callback) {
        this.db.findOne({ _id: session }, callback);
    }
    /**
     * Removes the SessionToken given session from store.
     * Should only be called from SessionData to also remove data of the session.
     * @param session sessionId
     * @param callback
     */
    remove(session, callback) {
        this.db.remove({ _id: session }, { multi: false }, callback);
    }
    /**
     * Updates the lastseen-parameter on SessionToken to the current time.
     * @param session sessionId
     * @param callback
     */
    seen(session, callback) {
        this.db.update({ _id: session }, { $set: { lastseen: new Date() } }, {}, callback);
    }
    /**
     * Gets all SessionTokens which are lastseen before the given date (lastseen < date)
     * @param date lastseen-date
     * @param callback
     */
    getExpired(date, callback) {
        this.db.find({ lastseen: { $st: date } }, callback);
    }
}
exports.SessionStore = SessionStore;
exports.sessionTokenStore = new SessionStore();
exports.default = exports.sessionTokenStore;
//# sourceMappingURL=sessionTokenStore.js.map