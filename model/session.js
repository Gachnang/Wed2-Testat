"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("./style");
const order_1 = require("./order");
const cookie = require("cookie");
const debug = require('debug')('Session');
class Session {
    constructor(style = style_1.default.White, order = order_1.default.priorityDesc, filterFinished = null, screenreader = false) {
        this.style = style;
        this.order = order;
        this.filterFinished = filterFinished;
        this.screenreader = screenreader;
    }
    save(res) {
        setSession(res, this);
    }
}
exports.Session = Session;
function getSession(req) {
    let sessionJSON = getCookie(req);
    if (sessionJSON) {
        debug('GetSession: ' + sessionJSON);
        // generate new session out of JSON
        let session = JSON.parse(sessionJSON);
        session.save = Session.prototype.save.bind(session);
        return session;
    }
    else {
        debug('GetSession: Default');
        return new Session();
    }
}
exports.getSession = getSession;
function setSession(res, session) {
    let stringify = JSON.stringify(session);
    debug('SetSession: ' + stringify);
    setCookie(res, stringify);
}
exports.setSession = setSession;
function getCookie(req) {
    // Parse the cookies on the request (in JSON-String)
    let cookies = cookie.parse(req.headers.cookie || '');
    return cookies['session'];
}
function setCookie(res, session) {
    // Set the cookie with the JSON
    res.setHeader('Set-Cookie', cookie.serialize('session', session, {
        httpOnly: true,
    }));
}
//# sourceMappingURL=session.js.map