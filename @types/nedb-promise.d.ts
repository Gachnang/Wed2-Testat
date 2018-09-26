
declare module 'nedb-promise' {
  import Nedb = require("nedb");
  export default nedbPromise;

  export function nedbPromise(pathOrOptions?: string | Nedb.DataStoreOptions): NedbPromise;

  class NedbPromise {
    nedb: Nedb;
    /// constructor(pathOrOptions?: string | Nedb.DataStoreOptions);

    /// loadDatabase(cb?: (err: Error) => void): void;
    loadDatabase(): Promise<void>;

    /// insert<T>(newDoc: T, cb?: (err: Error, document: T) => void): void;
    insert<T>(newDoc: T): Promise<T>;

    /// find<T>(query: any, projection: T, callback: (err: Error, documents: T[]) => void): void;
    find<T>(query: any, projection: T): Promise<T[]>;
    /// find<T>(query: any, callback: (err: Error, documents: T[]) => void): void;
    find<T>(query: any): Promise<T[]>;
    /// find<T>(query: any, projection?: T): Nedb.Cursor<T>;
    cfind<T>(query: any, projection?: T): Promise<Nedb.Cursor<T>>;

    /// findOne<T>(query: any, projection: T, callback: (err: Error, document: T) => void): void;
    findOne<T>(query: any, projection: T): Promise<T>;
    /// findOne<T>(query: any, callback: (err: Error, document: T) => void): void;
    findOne<T>(query: any): Promise<T>;
    cfindOne<T>(query: any, projection?: T): Promise<Nedb.Cursor<T>>;

    /// count(query: any, callback: (err: Error, n: number) => void): void;
    count(query: any): Promise<number>;
    ccount(query: any): Promise<Nedb.CursorCount>;

    /// update(query: any, updateQuery: any, options?: Nedb.UpdateOptions, cb?: (err: Error, numberOfUpdated: number, upsert: boolean) => void): void;
    update(query: any, updateQuery: any, options?: Nedb.UpdateOptions): Promise<number>;
    /// update<T>(query: any, updateQuery: any, options?: Nedb.UpdateOptions, cb?: (err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) => void): void;


    /// remove(query: any, options: Nedb.RemoveOptions, cb?: (err: Error, n: number) => void): void;
    remove(query: any, options: Nedb.RemoveOptions): Promise<number>;
    /// remove(query: any, cb?: (err: Error, n: number) => void): void;
    remove(query: any): Promise<number>;

    /// ensureIndex(options: Nedb.EnsureIndexOptions, cb?: (err: Error) => void): void;
    ensureIndex(options: Nedb.EnsureIndexOptions): Promise<void>;
    /// removeIndex(fieldName: string, cb?: (err: Error) => void): void;
    removeIndex(fieldName: string): Promise<void>;
  }

  export function fromInstance(nedbInstance: Nedb): NedbPromise;
}
