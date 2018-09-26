"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cookie = require("cookie");
const sessionData_1 = require("../model/session/sessionData");
const sessionTokenStore_1 = require("../model/session/sessionTokenStore");
const debug = require('debug')('SessionController');
function SessionController(req, res, next) {
    // self-awareness
    if (req.session) {
        next();
    }
    else {
        // get session from cookie
        let session = getCookie(req);
        if (!session) {
            debug('create new session..');
            // no session: create
            session = newSession();
            setCookie(res, session);
            sessionTokenStore_1.default.add(session, (err, sessionToken) => {
                if (err) {
                    next(err);
                }
                else if (sessionToken) {
                    req.session = new sessionData_1.default(sessionToken);
                    debug('session "' + session + '" created!');
                    next();
                }
                else {
                    next(new Error('Could not get new SessionToken...'));
                }
            });
        }
        else {
            debug('load session..');
            sessionTokenStore_1.default.get(session, (err, sessionToken) => {
                if (err) {
                    next(err);
                }
                else if (sessionToken) {
                    req.session = new sessionData_1.default(sessionToken);
                    debug('session "' + session + '" loaded! (lastseen: ' + sessionToken.lastseen.toString() + ')');
                    // set lastSeen (we dont have to wait of finished update.. (undefined callback))
                    sessionTokenStore_1.default.seen(session);
                    next();
                }
                else {
                    next(new Error('Could not get current SessionToken...'));
                }
            });
        }
    }
}
exports.SessionController = SessionController;
function getCookie(req) {
    // Parse the cookies on the request
    let cookies = cookie.parse(req.headers.cookie || '');
    return cookies['session'];
}
function setCookie(res, session) {
    // Set a new cookie with the name
    res.setHeader('Set-Cookie', cookie.serialize('session', session, {
        httpOnly: true,
    }));
}
function newSession() {
    // todo make a better session...
    return (new Date()).getMilliseconds().toString(10);
}
//# sourceMappingURL=sessionController.js.map