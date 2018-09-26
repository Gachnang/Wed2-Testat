import * as Datastore from 'nedb'
import {SessionToken} from "./sessionToken";

export class SessionStore {
  db: Datastore;

  constructor(db?: Datastore) {
    this.db = db || new Datastore({filename: './data/user.db', autoload: true});
  }

  add(session: string, callback?: (err: Error, sessionToken: SessionToken) => void) {
    this.db.insert<SessionToken>(new SessionToken(session), callback);
  }

  get(session: string, callback: (err: Error, sessionToken: SessionToken) => void) {
    this.db.findOne<SessionToken>({_id: session}, callback);
  }

  remove(session: string, callback?: (err: Error) => void) {
    this.db.remove({ _id: session },{ multi: false }, callback);
  }

  seen(session: string, callback?: (err: Error) => void) {
    this.db.update({_id: session}, { $set: { lastseen: new Date() } }, {}, callback);
  }

  removeOld(callback?: (err: Error) => void) {
    // now - 1 day
    let date = new Date();
    date.setDate(date.getDate() - 1);

    this.db.remove({ lastseen: {$st: date}}, { multi: true }, callback);
  }
}
export const sessionTokenStore = new SessionStore();
export default sessionTokenStore;