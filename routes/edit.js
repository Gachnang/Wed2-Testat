"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const style_1 = require("../model/style");
const noteStore_1 = require("../model/noteStore");
const note_1 = require("../model/note");
require('../views/handlebarHelpers');
exports.router = express.Router();
exports.default = exports.router;
/* GET home page. */
exports.router.all('/add', function (req, res, next) {
    if (req.body && req.body.add) {
        // user clicked "add" btn: add the new note
        let note = note_1.toNote(req.body);
        // todo
        // if everything is okey, redirect to index, otherwise render page (in callback of noteStore.add(...))
        if (true) {
            res.redirect('/');
        }
    }
    res.render('edit', {
        title: 'Note Pro - Add',
        note: req.body.add ? note_1.toNote(req.body) : null,
        styleName: style_1.default[req.session.style],
        screenreader: req.session.screenreader,
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: req.body
    });
});
exports.router.all('/edit', function (req, res, next) {
    if (req.body && req.body.save) {
        // user clicked "save" btn: add the new note
        let note = note_1.toNote(req.body);
        // todo
        // if everything is okey, redirect to index.  (in callback of noteStore.update(...))
        if (true) {
            res.redirect('/');
        }
    }
    if (req.body._id) {
        if (req.body.save) {
            // save failed.. re-render
            res.render('edit', {
                title: 'Note Pro - Edit',
                note: note_1.toNote(req.body),
                styleName: style_1.default[req.session.style],
                screenreader: req.session.screenreader,
                DEBUG1: JSON.stringify(req.session),
                DEBUG2: req.body
            });
        }
        else {
            noteStore_1.default.get(req.body._id, (err, note) => {
                if (err) {
                    next(err);
                }
                else {
                    res.render('edit', {
                        title: 'Note Pro - Edit',
                        note: note,
                        styleName: style_1.default[req.session.style],
                        screenreader: req.session.screenreader,
                        DEBUG1: JSON.stringify(req.session),
                        DEBUG2: req.body
                    });
                }
            });
        }
    }
    else {
        // _id is missing... Redirect to add
        res.redirect('/add');
    }
});
//# sourceMappingURL=edit.js.map