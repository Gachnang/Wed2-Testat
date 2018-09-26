import Style from "./style";
import Order from "./order";
import {Request, Response} from "express-serve-static-core";
import * as cookie from "cookie";


const debug: (msg?: string) => void = require('debug')('Session');

export class Session {
  style: Style;
  order: Order;
  filterFinished: boolean | null;

  constructor(style: Style = Style.White, order: Order = Order.priorityDesc, filterFinished: boolean = null) {
    this.style = style;
    this.order = order;
    this.filterFinished = filterFinished;
  }

  save(res: Response) {
    setSession(res, this);
  }
}

export function getSession(req: Request): Session {
  let sessionJSON: string = getCookie(req);
  if (sessionJSON) {
    debug('GetSession: ' + sessionJSON);
    // generate new session out of JSON
    let session: Session = JSON.parse(sessionJSON);
    session.save = Session.prototype.save.bind(session);
    return session;
  } else {
    debug('GetSession: Default');
    return new Session();
  }
}

export function setSession(res: Response, session: Session) {
  let stringify: string = JSON.stringify(session);
  debug('SetSession: ' + stringify);
  setCookie(res, stringify);
}

function getCookie(req: Request) : string | null {
  // Parse the cookies on the request (in JSON-String)
  let cookies: { [key: string]: string } = cookie.parse(<string>req.headers.cookie || '');
  return cookies['session'];
}

function setCookie(res: Response, session: string) {
  // Set the cookie with the JSON
  res.setHeader('Set-Cookie', cookie.serialize('session', session, {
    httpOnly: true,
    // todo only for browser-session! notSet = session?
    //maxAge: 60 * 60 // 1 hour
  }));
}