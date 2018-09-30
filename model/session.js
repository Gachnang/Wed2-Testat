"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("./style");
const order_1 = require("./order");
const cookie = require("cookie");
const debug = require('debug')('Session');
class Session {
    constructor(style = style_1.default.White, order = order_1.default.finishedDesc, filterFinished = null, screenreader = false) {
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
        repairSession(session);
        return session;
    }
    else {
        debug('GetSession: Default');
        return new Session();
    }
}
exports.getSession = getSession;
function repairSession(session) {
    if (typeof session.screenreader !== 'boolean') {
        debug('SetSession: repair "screenreader" ("' + session.screenreader + '")');
        session.screenreader = false;
    }
    if (session.filterFinished !== null && typeof session.filterFinished !== 'boolean') {
        debug('SetSession: repair "filterFinished" ("' + session.filterFinished + '")');
        session.filterFinished = null;
    }
    if (typeof session.order !== 'number' || typeof order_1.default[session.order] === 'undefined') {
        debug('SetSession: repair "order" ("' + session.order + '")');
        session.order = order_1.default.importanceDesc;
    }
    if (typeof session.style !== 'number' || typeof style_1.default[session.style] === 'undefined') {
        debug('SetSession: repair "style" ("' + session.style + '")');
        session.style = style_1.default.White;
    }
}
function setSession(res, session) {
    let stringify = JSON.stringify(session);
    repairSession(session);
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