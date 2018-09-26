import * as Datastore from 'nedb'
import {SessionToken} from "./sessionToken";

/**
 * Store for SessionTokens
 */
export class SessionStore {
  /**
   * the nedb-Datastore
   */
  db: Datastore;

  constructor(db?: Datastore) {
    this.db = db || new Datastore({filename: './data/session.db', autoload: true});
  }

  /**
   * Add a new SessionToken with given session to store
   * @param session sessionId
   * @param callback
   */
  add(session: string, callback?: (err: Error, sessionToken: SessionToken) => void) {
    this.db.insert<SessionToken>(new SessionToken(session), callback);
  }

  /**
   * Get SessionToken with given session from store
   * @param session sessionId
   * @param callback
   */
  get(session: string, callback: (err: Error, sessionToken: SessionToken) => void) {
    this.db.findOne<SessionToken>({_id: session}, callback);
  }

  /**
   * Removes the SessionToken given session from store.
   * Should only be called from SessionData to also remove data of the session.
   * @param session sessionId
   * @param callback
   */
  remove(session: string, callback?: (err: Error) => void) {
    this.db.remove({ _id: session },{ multi: false }, callback);
  }

  /**
   * Updates the lastseen-parameter on SessionToken to the current time.
   * @param session sessionId
   * @param callback
   */
  seen(session: string, callback?: (err: Error) => void) {
    this.db.update({_id: session}, { $set: { lastseen: new Date() } }, {}, callback);
  }

  /**
   * Gets all SessionTokens which are lastseen before the given date (lastseen < date)
   * @param date lastseen-date
   * @param callback
   */
  getExpired(date: Date, callback: (err: Error, sessionTokens: SessionToken[]) => void) {
    this.db.find({ lastseen: {$st: date}}, callback);
  }
}
export const sessionTokenStore = new SessionStore();
export default sessionTokenStore;