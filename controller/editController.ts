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
  if (req.body._id) {
    if (req.body.save) {
      let options = Object.assign(req.body, {
        title: 'Note Pro - Edit',
        note: bodyToNote(req.body),
        styleName: Style[req.session.style],
        screenreader: req.session.screenreader,
        DEBUG1: JSON.stringify(req.session),
        DEBUG2: JSON.stringify(req.body)
      } as EditOptions);

      // save failed.. re-render
      res.render('edit', options);
    } else {
      noteStore.get(req.body._id, (err: Error, note: Note) => {
        if (err) {
          next(err);
        } else {
          res.render('edit', noteToBody({
            title: 'Note Pro - Edit',
            styleName: Style[req.session.style],
            screenreader: req.session.screenreader,
            DEBUG1: JSON.stringify(req.session),
            DEBUG2: JSON.stringify(req.body)
          } as EditOptions, note));
        }
      });
    }
  } else {
    // _id is missing... Redirect to add
    res.redirect('/add');
  }
}
export default editController;