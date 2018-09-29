"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toNote(obj) {
    // @ts-ignore
    let ret = {};
    ret._id = obj._id;
    ret.title = obj.title;
    ret.description = obj.description;
    // todo wrong cast from string to date?
    // @ts-ignore
    ret.date = Date.parse(obj._id);
    ret.finished = !!obj.finished;
    ret.importance = Number.parseInt(obj.importance, 10);
    return ret;
}
exports.toNote = toNote;
//# sourceMappingURL=note.js.map