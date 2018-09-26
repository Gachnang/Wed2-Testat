import * as Datastore from 'nedb';

/**
 * Wraps around nedb to only provide data from the session.
 */
export class NedbSessionWrapper implements Datastore {
  /**
   * The original datastore
   */
  db: Datastore;

  /**
   * The session to filter by
   */
  session: string;

  constructor(constructValue: string | Nedb.DataStoreOptions | Datastore, session: string) {
    if(constructValue instanceof Datastore) {
      this.db = constructValue;
    } else {
      this.db = new Datastore(constructValue);
    }
    this.session = session;
  }

  /**
   * Mutates the query to filter by session
   * @param query
   * @param session
   */
  static mutateQuery(query: any, session: string): any {
    if (typeof query !== 'undefined') {
      if (typeof query.session !== 'undefined') {
        query.session = session;
      }
    } else {
      query = {session: session};
    }
    return query;
  }

  /**
   * Mutates the doc to have field session
   * @param doc
   * @param session
   */
  static mutateT<T>(doc: T, session: string): T {
    if (typeof doc !== 'undefined' && typeof doc['session'] !== 'undefined') {
      doc['session'] = session;
    }
    return doc;
  }

  /*******************************************************************************************************************/
  /* Wrapper-functions: Provide all functions from nedb.  ************************************************************/
  /*******************************************************************************************************************/

  get persistence(): Nedb.Persistence {
    return this.db.persistence;
  }
  set persistence(newPersistence: Nedb.Persistence) {
    this.db.persistence = newPersistence;
  }

  addToIndexes<T>(doc: T[] | T): void {
    if (Array.isArray(doc)) {
      for (let i = 0; i<doc.length; i++) {
        doc[i] = NedbSessionWrapper.mutateT(doc[i], this.session);
      }
    } else {
      doc = NedbSessionWrapper.mutateT(doc, this.session);
    }
    this.db.addToIndexes(doc);
  }

  count(query: any, callback: (err: Error, n: number) => void): void;
  count(query: any): Nedb.CursorCount;
  count(query: any, callback?: (err: Error, n: number) => void): void | Nedb.CursorCount {
    return this.db.count(NedbSessionWrapper.mutateQuery(query, this.session), callback);
  }

  ensureIndex(options: Nedb.EnsureIndexOptions, cb?: (err: Error) => void): void {
    return this.db.ensureIndex(options, cb);
  }

  find<T>(query: any, projection: T, callback: (err: Error, documents: T[]) => void): void;
  find<T>(query: any, projection?: T): Nedb.Cursor<T>;
  find<T>(query: any, callback: (err: Error, documents: T[]) => void): void;
  find(query: any, projection?, callback?): any {
    return this.db.find(NedbSessionWrapper.mutateQuery(query, this.session), projection, callback);
  }

  findOne<T>(query: any, projection: T, callback: (err: Error, document: T) => void): void;
  findOne<T>(query: any, callback: (err: Error, document: T) => void): void;
  findOne(query: any, projection, callback?): void {
    return this.db.findOne(NedbSessionWrapper.mutateQuery(query, this.session), projection, callback);
  }

  getAllData(): any[] {
    throw new Error('NedbSessionWrapper: Function "getAllData" is forbidden!');
  }

  getCandidates(query: any): void {
    return this.db.getCandidates(NedbSessionWrapper.mutateQuery(query, this.session));
  }

  insert<T>(newDoc: T, cb?: (err: Error, document: T) => void): void {
    return this.db.insert(NedbSessionWrapper.mutateT(newDoc, this.session), cb);
  }

  loadDatabase(cb?: (err: Error) => void): void {
    return this.db.loadDatabase(cb);
  }

  remove(query: any, options: Nedb.RemoveOptions, cb?: (err: Error, n: number) => void): void;
  remove(query: any, cb?: (err: Error, n: number) => void): void;
  remove(query: any, options?: Nedb.RemoveOptions | ((err: Error, n: number) => void), cb?: (err: Error, n: number) => void): void {
    // @ts-ignore
    return this.db.remove(nedbSessionWrapper.mutateQuery(query, this.session), options, cb);
  }

  removeFromIndexes<T>(doc: T[] | T): void {
    return this.db.removeFromIndexes(doc);
  }

  removeIndex(fieldName: string, cb?: (err: Error) => void): void {
    return this.db.removeIndex(fieldName, cb);
  }

  resetIndexes(newData: any): void {
    return this.db.resetIndexes(newData);
  }

  update(query: any, updateQuery: any, options?: Nedb.UpdateOptions, cb?: (err: Error, numberOfUpdated: number, upsert: boolean) => void): void;
  update<T>(query: any, updateQuery: any, options?: Nedb.UpdateOptions, cb?: (err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) => void): void;
  update(query: any, updateQuery: any, options?: Nedb.UpdateOptions, cb?: ((err: Error, numberOfUpdated: number, upsert: boolean) => void) | ((err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) => void)): void {
    // dont mutate updateQuery! Allow to transfer to other session
    this.db.update(NedbSessionWrapper.mutateQuery(query, this.session), updateQuery, options, cb);
  }

  updateIndexes<T>(oldDoc: T, newDoc: T): void;
  updateIndexes<T>(updates: Array<{ oldDoc: T; newDoc: T }>): void;
  updateIndexes(oldDoc, newDoc?): void {
    if (Array.isArray(oldDoc)) {
      for (let entry of oldDoc) {
        entry.oldDoc = NedbSessionWrapper.mutateT(entry.oldDoc, this.session);
      }
    } else {
      oldDoc = NedbSessionWrapper.mutateT(oldDoc, this.session);
    }

    return this.db.updateIndexes(oldDoc, newDoc);
  }
}
export default NedbSessionWrapper;