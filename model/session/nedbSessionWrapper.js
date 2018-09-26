"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Datastore = require("nedb");
/**
 * Wraps around nedb to only provide data from the session.
 */
class NedbSessionWrapper {
    constructor(constructValue, session) {
        if (constructValue instanceof Datastore) {
            this.db = constructValue;
        }
        else {
            this.db = new Datastore(constructValue);
        }
        this.session = session;
    }
    /**
     * Mutates the query to filter by session
     * @param query
     * @param session
     */
    static mutateQuery(query, session) {
        if (typeof query !== 'undefined') {
            if (typeof query.session !== 'undefined') {
                query.session = session;
            }
        }
        else {
            query = { session: session };
        }
        return query;
    }
    /**
     * Mutates the doc to have field session
     * @param doc
     * @param session
     */
    static mutateT(doc, session) {
        if (typeof doc !== 'undefined' && typeof doc['session'] !== 'undefined') {
            doc['session'] = session;
        }
        return doc;
    }
    /*******************************************************************************************************************/
    /* Wrapper-functions: Provide all functions from nedb.  ************************************************************/
    /*******************************************************************************************************************/
    get persistence() {
        return this.db.persistence;
    }
    set persistence(newPersistence) {
        this.db.persistence = newPersistence;
    }
    addToIndexes(doc) {
        if (Array.isArray(doc)) {
            for (let i = 0; i < doc.length; i++) {
                doc[i] = NedbSessionWrapper.mutateT(doc[i], this.session);
            }
        }
        else {
            doc = NedbSessionWrapper.mutateT(doc, this.session);
        }
        this.db.addToIndexes(doc);
    }
    count(query, callback) {
        return this.db.count(NedbSessionWrapper.mutateQuery(query, this.session), callback);
    }
    ensureIndex(options, cb) {
        return this.db.ensureIndex(options, cb);
    }
    find(query, projection, callback) {
        return this.db.find(NedbSessionWrapper.mutateQuery(query, this.session), projection, callback);
    }
    findOne(query, projection, callback) {
        return this.db.findOne(NedbSessionWrapper.mutateQuery(query, this.session), projection, callback);
    }
    getAllData() {
        throw new Error('NedbSessionWrapper: Function "getAllData" is forbidden!');
    }
    getCandidates(query) {
        return this.db.getCandidates(NedbSessionWrapper.mutateQuery(query, this.session));
    }
    insert(newDoc, cb) {
        return this.db.insert(NedbSessionWrapper.mutateT(newDoc, this.session), cb);
    }
    loadDatabase(cb) {
        return this.db.loadDatabase(cb);
    }
    remove(query, options, cb) {
        // @ts-ignore
        return this.db.remove(nedbSessionWrapper.mutateQuery(query, this.session), options, cb);
    }
    removeFromIndexes(doc) {
        return this.db.removeFromIndexes(doc);
    }
    removeIndex(fieldName, cb) {
        return this.db.removeIndex(fieldName, cb);
    }
    resetIndexes(newData) {
        return this.db.resetIndexes(newData);
    }
    update(query, updateQuery, options, cb) {
        // dont mutate updateQuery! Allow to transfer to other session
        this.db.update(NedbSessionWrapper.mutateQuery(query, this.session), updateQuery, options, cb);
    }
    updateIndexes(oldDoc, newDoc) {
        if (Array.isArray(oldDoc)) {
            for (let entry of oldDoc) {
                entry.oldDoc = NedbSessionWrapper.mutateT(entry.oldDoc, this.session);
            }
        }
        else {
            oldDoc = NedbSessionWrapper.mutateT(oldDoc, this.session);
        }
        return this.db.updateIndexes(oldDoc, newDoc);
    }
}
exports.NedbSessionWrapper = NedbSessionWrapper;
exports.default = NedbSessionWrapper;
//# sourceMappingURL=nedbSessionWrapper.js.map