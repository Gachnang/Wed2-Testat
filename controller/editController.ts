import { NextFunction, Request, Response } from "express-serve-static-core";
import {Note, bodyToNote, noteToBody} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

export function editController(req: Request, res: Response, next: NextFunction) {
  if (req.body && req.body.save) {
    // user clicked "save" btn: add the new note
    let note: Note = bodyToNote(req.body);
    // todo
    // if everything is okey, redirect to index.  (in callback of noteStore.update(...))
    if(true) {
      res.redirect('/');
    }
  }
  if (req.params._id) {
    if (req.method === 'PUT') {
      let note: Note = bodyToNote(req.body);

      // save failed.. re-renderres.render('edit', {
      //             title: 'Note Pro - Edit',
      //             styleName: Style[req.session.style],
      //             screenreader: req.session.screenreader,
      //             note: note,
      //             DEBUG1: JSON.stringify(req.session),
      //             DEBUG2: JSON.stringify(req.body)
      //           });
      //         }
    } else if (req.method === 'GET') {
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
          });
        }
      });
    }
  } else {
    // not put or get...
  }
}
export default editController;