/***
 * Representing the sessionId
 */
export class SessionToken {
  /**
   * Session
   */
  _id: string;
  get session(): string {
    return this._id;
  }
  set session(session: string) {
    this._id = session;
  }

  /**
   * Date of creation
   */
  created: Date;

  /**
   * Date of last seen user with this session
   */
  lastseen: Date;

  constructor(session: string, created: Date = new Date()) {
    this.session = session;
    this.created = created;
    this.lastseen = this.created;
  }
}