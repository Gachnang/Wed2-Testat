"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = require("../model/session");
const debug = require('debug')('SessionController');
function SessionController(req, res, next) {
    // self-awareness
    if (!req.session) {
        // load/create session
        req.session = session_1.getSession(req);
    }
    // test body for changeOptionRequest
    if (req.session && req.method === 'GET' && req.query && req.query !== {}) {
        let mutated = false;
        for (let fieldName of ['style', 'order', 'filter', 'screenreader']) {
            if (typeof req.query[fieldName] !== 'undefined') {
                //if(req.body['option:' + fieldName]) {
                debug('Update "' + fieldName +
                    '" from "' + req.session[fieldName] +
                    '" to "' + (req.query[fieldName] || null) + '"');
                // property of Session is number(enum) or boolean/null
                req.session[fieldName] = typeof req.session[fieldName] === 'number' ?
                    // parse number
                    Number.parseInt(req.query[fieldName], 10) :
                    // parse boolean (null for emptyString)
                    req.query[fieldName] === '' ? null :
                        req.query[fieldName] === 'true';
                // mutated!
                mutated = true;
            }
        }
        // save when mutated
        if (mutated) {
            req.session.save(res);
        }
    }
    // i'm finished, next!
    next();
}
exports.SessionController = SessionController;
//# sourceMappingURL=sessionController.js.map