import {SessionToken} from "./sessionToken";

/**
 * The class provides in the request to interact with database.
 */
export class SessionData {
  sessionToken: SessionToken;
  get session(): string {
    return this.sessionToken.session;
  }

  constructor(sessionToken: SessionToken) {
    this.sessionToken = sessionToken;
  }
}
export default SessionData;