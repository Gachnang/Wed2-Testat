import * as Datastore from 'nedb';
import NedbSessionWrapper from './session/nedbSessionWrapper';
import {DefaultOptions, Options} from "./options";

const debug: (msg: string) => void = require('debug')('OptionsStore');

/**
 * The real datastore
 */
const datastore = new Datastore({filename: './data/option.db', autoload: true});

/**
 * Store for Options
 */
export class OptionsStore {
  /**
   * the nedb-Datastore
   */
  db: Datastore;

  constructor(session: string) {
    // wrap around real datastore
    this.db = new NedbSessionWrapper(datastore, session);
  }

  get(callback: (err: Error, option: Options) => void) {
    let _this = this;
    this.db.findOne({}, (err: Error, option: Options) => {
      if (err) {
        // give err back
        callback(err, null);
      } else if (option) {
        // give option back
        callback(null, option);
      } else {
        // no option present: setDefault
        _this.setDefault(callback, true);
      }
    });
  }

  set(options: Options, callback: (err: Error, option: Options) => void) {
    this.db.update({}, options, {},
      (err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) => {
      if (err) {
        callback(err, null);
      } else {
        if(Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
          callback(null, affectedDocuments[0]);
        } else {
          callback(null, affectedDocuments);
        }
      }
    });
  }

  setDefault(callback: (err: Error, option: Options) => void, add?: boolean) {
    let _this = this;

    if(typeof add === 'undefined') {
      // test if option present in db and recall self with param 'add'
      this.db.findOne({}, (err: Error, option: Options) => {
        if (err) {
          callback(err, null);
        } else if (option) {
          _this.setDefault(callback, false);
        } else {
          _this.setDefault(callback, true);
        }
      });
    } else {
      if (add) {
        debug('insert new DefaultOptions');
        this.db.insert(DefaultOptions, callback);
      } else {
        debug('update to DefaultOptions');
        this.db.update({}, DefaultOptions, {},
          (err: Error, numberOfUpdated: number, affectedDocuments: any, upsert: boolean) => {
          if (err) {
            callback(err, null);
          } else {
            if(Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
              callback(null, affectedDocuments[0]);
            } else {
              callback(null, affectedDocuments);
            }
          }
        });
      }
    }
  }

}
