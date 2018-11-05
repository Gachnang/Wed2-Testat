"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../model/note");
const style_1 = require("../model/style");
const noteStore_1 = require("../model/noteStore");
function editController(req, res, next) {
    if (req.method === 'PUT' && req.params._id && req.body.save) {
        let note = note_1.bodyToNote(req.body);
        noteStore_1.default.update(note, (err, note) => {
            if (err) {
                // save failed.. re-render
                res.render('edit', {
                    title: 'Note Pro - Edit',
                    styleName: style_1.default[req.session.style],
                    screenreader: req.session.screenreader,
                    note: note,
                    error: err,
                    DEBUG1: JSON.stringify(req.session),
                    DEBUG2: JSON.stringify(req.body)
                });
            }
            else {
                res.redirect('/');
            }
        });
    }
    else if (req.method === 'GET') {
        if (req.params._id) {
            noteStore_1.default.get(req.params._id, (err, note) => {
                if (err) {
                    next(err);
                }
                else {
                    res.render('edit', {
                        title: 'Note Pro - Edit',
                        styleName: style_1.default[req.session.style],
                        screenreader: req.session.screenreader,
                        note: note,
                        DEBUG1: JSON.stringify(req.session),
                        DEBUG2: JSON.stringify(req.body)
                    });
                }
            });
        }
        else {
            res.render('edit', {
                title: 'Note Pro - Add',
                styleName: style_1.default[req.session.style],
                screenreader: req.session.screenreader,
                note: {},
                DEBUG1: JSON.stringify(req.session),
                DEBUG2: JSON.stringify(req.body)
            });
        }
    }
}
exports.editController = editController;
exports.default = editController;
//# sourceMappingURL=editController.js.map