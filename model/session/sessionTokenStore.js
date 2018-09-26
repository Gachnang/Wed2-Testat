"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = require("nedb");
const sessionToken_1 = require("./sessionToken");
class SessionStore {
    constructor(db) {
        this.db = db || new Datastore({ filename: './data/user.db', autoload: true });
    }
    add(session, callback) {
        this.db.insert(new sessionToken_1.SessionToken(session), callback);
    }
    get(session, callback) {
        this.db.findOne({ _id: session }, callback);
    }
    remove(session, callback) {
        this.db.remove({ _id: session }, { multi: false }, callback);
    }
    seen(session, callback) {
        this.db.update({ _id: session }, { $set: { lastseen: new Date() } }, {}, callback);
    }
    removeOld(callback) {
        // now - 1 day
        let date = new Date();
        date.setDate(date.getDate() - 1);
        this.db.remove({ lastseen: { $st: date } }, { multi: true }, callback);
    }
}
exports.SessionStore = SessionStore;
exports.sessionTokenStore = new SessionStore();
exports.default = exports.sessionTokenStore;
//# sourceMappingURL=sessionTokenStore.js.map