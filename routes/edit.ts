import * as express from 'express';
import * as core from "express-serve-static-core";
import {EditOptions, IndexOptions} from "../views/handlebarOptions";
import Style from "../model/style";
import noteStore from "../model/noteStore";
import {Note, toNote} from "../model/note";

require('../views/handlebarHelpers');

export const router: core.Router = express.Router();
export default router;

/* GET home page. */
router.all('/add', function(req, res, next) {
  if (req.body && req.body.add) {
    // user clicked "add" btn: add the new note
    let note: Note = toNote(req.body);
    // todo
    // if everything is okey, redirect to index, otherwise render page (in callback of noteStore.add(...))
    if(true) {
      res.redirect('/');
    }
  }
  res.render('edit', {
    title: 'Note Pro - Add',
    note: req.body.add ? toNote(req.body) : null,
    styleName: Style[req.session.style],
    screenreader: req.session.screenreader,
    DEBUG1: JSON.stringify(req.session),
    DEBUG2: req.body
  } as EditOptions);
});

router.all('/edit', function(req, res, next) {
  if (req.body && req.body.save) {
    // user clicked "save" btn: add the new note
    let note: Note = toNote(req.body);
    // todo
    // if everything is okey, redirect to index.  (in callback of noteStore.update(...))
    if(true) {
      res.redirect('/');
    }
  }
  if (req.body._id) {
    if (req.body.save) {
      // save failed.. re-render
      res.render('edit', {
        title: 'Note Pro - Edit',
        note: toNote(req.body),
        styleName: Style[req.session.style],
        screenreader: req.session.screenreader,
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: req.body
      } as EditOptions);
    } else {
      noteStore.get(req.body._id, (err: Error, note: Note) => {
        if (err) {
          next(err);
        } else {
          res.render('edit', {
            title: 'Note Pro - Edit',
            note: note,
            styleName: Style[req.session.style],
            screenreader: req.session.screenreader,
            DEBUG1: JSON.stringify(req.session),
            DEBUG2: req.body
          } as EditOptions);
        }
      });
    }
  } else {
    // _id is missing... Redirect to add
    res.redirect('/add');
  }
});