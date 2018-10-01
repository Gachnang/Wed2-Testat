"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../model/note");
const style_1 = require("../model/style");
const noteStore_1 = require("../model/noteStore");
function editController(req, res, next) {
    if (req.body && req.body.save) {
        // user clicked "save" btn: add the new note
        let note = note_1.bodyToNote(req.body);
        // todo
        // if everything is okey, redirect to index.  (in callback of noteStore.update(...))
        if (true) {
            res.redirect('/');
        }
    }
    if (req.params._id) {
        if (req.method === 'PUT') {
            let note = note_1.bodyToNote(req.body);
            // save failed.. re-renderres.render('edit', {
            //             title: 'Note Pro - Edit',
            //             styleName: Style[req.session.style],
            //             screenreader: req.session.screenreader,
            //             note: note,
            //             DEBUG1: JSON.stringify(req.session),
            //             DEBUG2: JSON.stringify(req.body)
            //           });
            //         }
        }
        else if (req.method === 'GET') {
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
    }
    else {
        // not put or get...
    }
}
exports.editController = editController;
exports.default = editController;
//# sourceMappingURL=editController.js.map