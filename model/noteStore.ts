import * as Datastore from 'nedb';
import {Note} from "./note";
import Order, {getComparator} from "./order";

const debug: (msg: string) => void = require('debug')('NoteStore');

/**
 * The real datastore
 */
const datastore = new Datastore({filename: './data/note.db', autoload: true});

class NoteStore {
  private _db: Datastore;

  constructor() {
    this._db = datastore;
  }

  get(callback: (err: Error, notes: Note[]) => void, order?: Order, finished?: boolean) {
    if (typeof order === 'undefined') {
      order = Order.priorityDesc;
    }

    this._db.find(
      typeof finished === 'undefined' ?
        {} :
        finished ?
          {finished: true} :
          {finished: false},
      (err: Error, notes: Note[]) => {
        if (Array.isArray(notes)) {
          notes.sort(getComparator(order));
          callback(null, notes);
        }
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
        (err: Error, numberOfUpdated, affectedDocuments: Note[], upsert: boolean) => {
        if (err) {
          callback(err, null);
        } else if (numberOfUpdated > 0 && Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
          callback(null, affectedDocuments[0]);
        } else {
          callback(new Error('Update failed: No entries got updated.'), null);
        }
      });
    }
  }
}
export const noteStore: NoteStore = new NoteStore();
export default noteStore;