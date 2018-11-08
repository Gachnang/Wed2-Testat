"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../model/note");
const style_1 = require("../model/style");
const noteStore_1 = require("../model/noteStore");
const debug = require('debug')('AddController');
function addController(req, res, next) {
    if (req.body.cancel) {
        res.redirect('/');
        return;
    }
    else if (req.body && req.body.add) {
        // user clicked "add" btn: add the new note
        let note = note_1.bodyToNote(req.body);
        // HTML should check values before updating, but we do it twice:
        let errors = note_1.validate(note);
        if (errors.length > 0) {
            debug('Validation of note failed!');
            // validate failed.. re-render
            res.render('edit', {
                _id: req.params._id,
                title: 'Note Pro - Edit',
                styleName: style_1.default[req.session.style],
                screenreader: req.session.screenreader,
                note: note,
                error: new Error(errors.toString()),
                DEBUG1: JSON.stringify(req.session),
                DEBUG2: JSON.stringify(req.body)
            });
            return;
        }
        noteStore_1.default.update(note, (err, noteResponse) => {
            if (err) {
                // save failed.. re-render
                res.render('edit', {
                    _id: req.params._id,
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
    res.render('edit', {
        title: 'Note Pro - Add',
        note: req.body.add ? note_1.bodyToNote(req.body) : null,
        styleName: style_1.default[req.session.style],
        screenreader: req.session.screenreader,
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: JSON.stringify(req.body)
    });
}
exports.addController = addController;
exports.default = addController;
//# sourceMappingURL=addController.js.map