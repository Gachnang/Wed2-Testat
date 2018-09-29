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
    if (req.body._id) {
        if (req.body.save) {
            let options = Object.assign(req.body, {
                title: 'Note Pro - Edit',
                note: note_1.bodyToNote(req.body),
                styleName: style_1.default[req.session.style],
                screenreader: req.session.screenreader,
                DEBUG1: JSON.stringify(req.session),
                DEBUG2: JSON.stringify(req.body)
            });
            // save failed.. re-render
            res.render('edit', options);
        }
        else {
            noteStore_1.default.get(req.body._id, (err, note) => {
                if (err) {
                    next(err);
                }
                else {
                    res.render('edit', note_1.noteToBody({
                        title: 'Note Pro - Edit',
                        styleName: style_1.default[req.session.style],
                        screenreader: req.session.screenreader,
                        DEBUG1: JSON.stringify(req.session),
                        DEBUG2: JSON.stringify(req.body)
                    }, note));
                }
            });
        }
    }
    else {
        // _id is missing... Redirect to add
        res.redirect('/add');
    }
}
exports.editController = editController;
exports.default = editController;
//# sourceMappingURL=editController.js.map