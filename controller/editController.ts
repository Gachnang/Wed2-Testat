import { NextFunction, Request, Response } from "express-serve-static-core";
import {Note, bodyToNote, noteToBody, validate} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

const debug: (msg: string) => void = require('debug')('EditController');

function renderContent(req : Request, res : Response, note : Note) {
    res.render('edit', {
        _id: req.params._id,
        title: 'Note Pro - Edit',
        styleName: Style[req.session.style],
        screenreader: req.session.screenreader,
        note: note,
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: JSON.stringify(req.body)
    } as EditOptions);
}

export function editController(req: Request, res: Response, next: NextFunction) {
  if (req.body.cancel) {
    res.redirect('/');
    return;
  } else if (req.method === 'POST' && req.params._id && req.body.save) {
    let note: Note = bodyToNote(req.body);
    if (req.params._id) {
      note._id = req.params._id;
    }

    // HTML should check values before updating, but we do it twice:
    let errors = validate(note);
    if (errors.length > 0) {
      debug('Validation of note failed!');

      // validate failed.. re-render
        renderContent(req, res, note);
      return;
    }

    noteStore.update(note, (err: Error, noteResponse: Note) => {
      if (err) {
        // save failed.. re-render
          renderContent(req, res, note);
      } else {
        res.redirect('/');
      }
    });
    return;
  } else if (req.method === 'GET') {
    if (req.params._id) {
      noteStore.get(req.params._id, (err: Error, note: Note) => {
        if (err) {
          next(err);
        } else {
            renderContent(req, res, note);
        }
      });
      return;
    }
  }

  renderContent(req, res, null);
}
export default editController;