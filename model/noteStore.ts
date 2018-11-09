import * as Datastore from 'nedb';
import {Note} from "./note";
import Order, {getComparator} from "./order";

/**
 * The real datastore
 */
const datastore = new Datastore({filename: './data/note.db', autoload: true});

class NoteStore {
  private _db: Datastore;

  constructor() {
    this._db = datastore;
  }

  get(id: string, callback: (err: Error, notes: Note) => void) {
    this._db.findOne({_id: id}, callback);
  }

  getAll(callback: (err: Error, notes: Note[]) => void, order?: Order, finished?: boolean) {
    if (typeof order === 'undefined') {
      order = Order.importanceDesc;
    }

    this._db.find(
      typeof finished === 'undefined' || finished === null ?
        {} :
        finished ?
          {finished: true} :
          {finished: false},
      (err: Error, notes: Note[]) => {
        if (Array.isArray(notes)) {
          notes.sort(getComparator(order));
        }
        callback(null, notes);
      });
  }

  insert(note: Note, callback: (err: Error, note: Note) => void) {
    if (note._id) {
      // no id! Remove id, so clone is possible.
      delete note._id;
    }
    this._db.insert(note, callback);
  }

  update(note: Note, callback: (err: Error, note: Note) => void) {
    if (typeof note._id === 'undefined') {
      callback(new Error('Cant update note with unset id.'), null);
    } else {
      this._db.update({_id: note._id}, note, {multi: false},
        (err: Error, numberOfUpdated, affectedDocuments: Note[]) => {
        if (err) {
          callback(err, null);
        } else if (numberOfUpdated > 0) {
          if (Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
            callback(null, affectedDocuments[0]);
          } else {
            callback(null, note);
          }
        } else {
          callback(new Error('Update failed: No entries got updated.'), null);
        }
      });
    }
  }
}
export const noteStore: NoteStore = new NoteStore();
export default noteStore;