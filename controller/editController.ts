import { NextFunction, Request, Response } from "express-serve-static-core";
import {Note, bodyToNote, noteToBody} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

export function editController(req: Request, res: Response, next: NextFunction) {
  if (req.method === 'PUT' && req.params._id && req.body.save) {
    let note: Note = bodyToNote(req.body);

    noteStore.update(note, (err: Error, note: Note) => {
      if (err) {
        // save failed.. re-render
        res.render('edit', {
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
  } else if (req.method === 'GET') {
    if (req.params._id) {
      noteStore.get(req.params._id, (err: Error, note: Note) => {
        if (err) {
          next(err);
        } else {
          res.render('edit', {
            title: 'Note Pro - Edit',
            styleName: Style[req.session.style],
            screenreader: req.session.screenreader,
            note: note,
            DEBUG1: JSON.stringify(req.session),
            DEBUG2: JSON.stringify(req.body)
          } as EditOptions);
        }
      });
    } else {
      res.render('edit', {
        title: 'Note Pro - Add',
        styleName: Style[req.session.style],
        screenreader: req.session.screenreader,
        note: {},
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: JSON.stringify(req.body)
      } as EditOptions);
    }
  }
}
export default editController;