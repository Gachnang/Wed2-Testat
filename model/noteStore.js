"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = require("nedb");
const order_1 = require("./order");
const debug = require('debug')('NoteStore');
/**
 * The real datastore
 */
const datastore = new Datastore({ filename: './data/note.db', autoload: true });
class NoteStore {
    constructor() {
        this._db = datastore;
    }
    get(id, callback) {
        this._db.findOne({ _id: id }, callback);
    }
    getAll(callback, order, finished) {
        if (typeof order === 'undefined') {
            order = order_1.default.importanceDesc;
        }
        this._db.find(typeof finished === 'undefined' || finished === null ?
            {} :
            finished ?
                { finished: true } :
                { finished: false }, (err, notes) => {
            if (Array.isArray(notes)) {
                notes.sort(order_1.getComparator(order));
            }
            callback(null, notes);
        });
    }
    insert(note, callback) {
        if (note._id) {
            // no id! Remove id, so clone is possible.
            delete note._id;
        }
        this._db.insert(note, callback);
    }
    update(note, callback) {
        if (typeof note._id === 'undefined') {
            callback(new Error('Cant update note with unset id.'), null);
        }
        else {
            this._db.update({ _id: note._id }, note, { multi: false }, (err, numberOfUpdated, affectedDocuments, upsert) => {
                if (err) {
                    callback(err, null);
                }
                else if (numberOfUpdated > 0 && Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
                    callback(null, affectedDocuments[0]);
                }
                else {
                    callback(new Error('Update failed: No entries got updated.'), null);
                }
            });
        }
    }
}
exports.noteStore = new NoteStore();
exports.default = exports.noteStore;
//# sourceMappingURL=noteStore.js.map