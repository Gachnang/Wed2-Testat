import Style from "./style";
import Order from "./order";
import {Request, Response} from "express-serve-static-core";
import * as cookie from "cookie";

const debug: (msg?: string) => void = require('debug')('Session');

export class Session {
  style: Style;
  order: Order;
  filter: boolean | null;
  screenreader: boolean;

  constructor(style: Style = Style.White, order: Order = Order.finishedDesc, filter: boolean = null, screenreader: boolean = false) {
    this.style = style;
    this.order = order;
    this.filter = filter;
    this.screenreader = screenreader;
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
    repairSession(session);
    return session;
  } else {
    debug('GetSession: Default');
    return new Session();
  }
}

function repairSession(session: Session) {
  if (typeof session.screenreader !== 'boolean') {
    debug('SetSession: repair "screenreader" ("' + session.screenreader + '")');
    session.screenreader = false;
  }
  if (session.filter !== null && typeof session.filter !== 'boolean') {
    debug('SetSession: repair "filter" ("' + session.filter + '")');
    session.filter = null;
  }
  if (typeof session.order !== 'number' || typeof Order[session.order] === 'undefined') {
    debug('SetSession: repair "order" ("' + session.order + '")');
    session.order = Order.importanceDesc;
  }
  if (typeof session.style !== 'number' || typeof Style[session.style] === 'undefined') {
    debug('SetSession: repair "style" ("' + session.style + '")');
    session.style = Style.White;
  }
}

export function setSession(res: Response, session: Session) {
  let stringify: string = JSON.stringify(session);
  repairSession(session);
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