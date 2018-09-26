import {NextFunction, Request, Response} from "express-serve-static-core";
import * as cookie from 'cookie';
import SessionData from "../model/session/sessionData";
import sessionTokenStore from "../model/session/sessionTokenStore";
import {SessionToken} from "../model/session/sessionToken";

const debug: (msg: string) => void = require('debug')('SessionController');

declare global {
  namespace Express {
    interface Request {
      session?: SessionData;
    }
  }
}

export function SessionController(req: Request, res: Response, next: NextFunction): any {
  // self-awareness
  if (req.session) {
    next();
  } else {
    // get session from cookie
    let session = getCookie(req);
    if(!session) {
      debug('create new session..');

      // no session: create
      session = newSession();
      setCookie(res, session);

      sessionTokenStore.add(session, (err: Error, sessionToken: SessionToken) => {
        if(err) {
          next(err);
        } else if (sessionToken) {
          req.session = new SessionData(sessionToken);
          debug('session "' + session + '" created!');
          next();
        } else {
          next(new Error('Could not get new SessionToken...'));
        }
      });
    } else {
      debug('load session..');
      sessionTokenStore.get(session, (err: Error, sessionToken: SessionToken) => {
        if (err) {
          next(err);
        } else if (sessionToken) {
          req.session = new SessionData(sessionToken);
          debug('session "' + session + '" loaded! (lastseen: ' + sessionToken.lastseen.toString() + ')');

          // set lastSeen (we dont have to wait of finished update.. (undefined callback))
          sessionTokenStore.seen(session);

          next();
        } else {
          next(new Error('Could not get current SessionToken...'));
        }
      });
    }
  }
}

function getCookie(req: Request) : string | null {
  // Parse the cookies on the request
  let cookies: { [key: string]: string } = cookie.parse(<string>req.headers.cookie || '');
  return cookies['session'];
}

function setCookie(res: Response, session: string) {
  // Set a new cookie with the name
  res.setHeader('Set-Cookie', cookie.serialize('session', session, {
    httpOnly: true,
    // todo only for browser-session! notSet = session?
    //maxAge: 60 * 60 // 1 hour
  }));
}

function newSession(): string {
  // todo make a better session...
  return (new Date()).getMilliseconds().toString(10);
}
