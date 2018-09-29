"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../model/note");
const style_1 = require("../model/style");
function addController(req, res, next) {
    if (req.body && req.body.add) {
        // user clicked "add" btn: add the new note
        let note = note_1.bodyToNote(req.body);
        // todo
        // if everything is okey, redirect to index, otherwise render page (in callback of noteStore.add(...))
        if (true) {
            res.redirect('/');
        }
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