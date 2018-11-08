import { NextFunction, Request, Response } from "express-serve-static-core";
import {Note, bodyToNote, validate} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

const debug: (msg: string) => void = require('debug')('AddController');

export function addController(req: Request, res: Response, next: NextFunction) {
  if (req.body.cancel) {
    res.redirect('/');
    return;
  } else if (req.body && req.body.add) {
    // user clicked "add" btn: add the new note
    let note: Note = bodyToNote(req.body);
    // HTML should check values before updating, but we do it twice:
    let errors = validate(note);
    if (errors.length > 0) {
      debug('Validation of note failed!');

      // validate failed.. re-render
      res.render('edit', {
        _id: req.params._id,
        title: 'Note Pro - Edit',
        styleName: Style[req.session.style],
        screenreader: req.session.screenreader,
        note: note,
        error: new Error(errors.toString()),
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: JSON.stringify(req.body)
      } as EditOptions);
      return;
    }

    noteStore.update(note, (err: Error, noteResponse: Note) => {
      if (err) {
        // save failed.. re-render
        res.render('edit', {
          _id: req.params._id,
          title: 'Note Pro - Edit',
          styleName: Style[req.session.style],
          screenreader: req.session.screenreader,
          note: note,
          error: err,
          DEBUG1: JSON.stringify(req.session),
          DEBUG2: JSON.stringify(req.body)
        } as EditOptions);
      } else {
        res.redirect('/');
      }
    });
  }
  res.render('edit', {
    title: 'Note Pro - Add',
    note: req.body.add ? bodyToNote(req.body) : null,
    styleName: Style[req.session.style],
    screenreader: req.session.screenreader,
    DEBUG1: JSON.stringify(req.session),
    DEBUG2: JSON.stringify(req.body)
  } as EditOptions);
}
export default addController;