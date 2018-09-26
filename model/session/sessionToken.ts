export class SessionToken {
  _id: string;
  get session(): string {
    return this._id;
  }
  set session(session: string) {
    this._id = session;
  }

  created: Date;
  lastseen: Date;

  constructor(session: string, created: Date = new Date()) {
    this.session = session;
    this.created = created;
    this.lastseen = this.created;
  }
}