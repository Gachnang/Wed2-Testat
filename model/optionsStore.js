"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = require("nedb");
const nedbSessionWrapper_1 = require("./session/nedbSessionWrapper");
const options_1 = require("./options");
const debug = require('debug')('OptionsStore');
/**
 * The real datastore
 */
const datastore = new Datastore({ filename: './data/option.db', autoload: true });
/**
 * Store for Options
 */
class OptionsStore {
    constructor(session) {
        // wrap around real datastore
        this.db = new nedbSessionWrapper_1.default(datastore, session);
    }
    get(callback) {
        let _this = this;
        this.db.findOne({}, (err, option) => {
            if (err) {
                // give err back
                callback(err, null);
            }
            else if (option) {
                // give option back
                callback(null, option);
            }
            else {
                // no option present: setDefault
                _this.setDefault(callback, true);
            }
        });
    }
    set(options, callback) {
        this.db.update({}, options, {}, (err, numberOfUpdated, affectedDocuments, upsert) => {
            if (err) {
                callback(err, null);
            }
            else {
                if (Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
                    callback(null, affectedDocuments[0]);
                }
                else {
                    callback(null, affectedDocuments);
                }
            }
        });
    }
    setDefault(callback, add) {
        let _this = this;
        if (typeof add === 'undefined') {
            // test if option present in db and recall self with param 'add'
            this.db.findOne({}, (err, option) => {
                if (err) {
                    callback(err, null);
                }
                else if (option) {
                    _this.setDefault(callback, false);
                }
                else {
                    _this.setDefault(callback, true);
                }
            });
        }
        else {
            if (add) {
                debug('insert new DefaultOptions');
                this.db.insert(options_1.DefaultOptions, callback);
            }
            else {
                debug('update to DefaultOptions');
                this.db.update({}, options_1.DefaultOptions, {}, (err, numberOfUpdated, affectedDocuments, upsert) => {
                    if (err) {
                        callback(err, null);
                    }
                    else {
                        if (Array.isArray(affectedDocuments) && affectedDocuments.length > 0) {
                            callback(null, affectedDocuments[0]);
                        }
                        else {
                            callback(null, affectedDocuments);
                        }
                    }
                });
            }
        }
    }
}
exports.OptionsStore = OptionsStore;
//# sourceMappingURL=optionsStore.js.map