import {NextFunction, Request, Response} from "express-serve-static-core";
import {getSession, Session} from "../model/session";

const debug: (msg?: string) => void = require('debug')('SessionController');

// declaration for TypeScript
declare global {
  namespace Express {
    interface Request {
      session?: Session;
    }
  }
}

export function SessionController(req: Request, res: Response, next: NextFunction): any {
  // self-awareness
  if (!req.session) {
    // load/create session
    req.session = getSession(req);
  }

  // test body for changeOptionRequest
  if(req.session && req.method === 'POST' && req.body && req.body !== {}) {
    let mutated: boolean = false;

    for(let fieldName of ['style', 'order', 'filterFinished', 'screenreader']) {
      if (typeof req.body['option:' + fieldName] !== 'undefined') {
      //if(req.body['option:' + fieldName]) {
        debug(
          'Update "' + fieldName +
          '" from "' + req.session[fieldName] +
          '" to "' + (req.body['option:' + fieldName] || null) + '"');

        // property of Session is number(enum) or boolean/null
        req.session[fieldName] = typeof req.session[fieldName] === 'number' ?
          // parse number
          Number.parseInt(req.body['option:' + fieldName], 10) :
          // parse boolean (null for emptyString)
          req.body['option:' + fieldName] === '' ? null :
            req.body['option:' + fieldName] === 'true';

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
