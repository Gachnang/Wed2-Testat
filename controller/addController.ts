import { NextFunction, Request, Response } from "express-serve-static-core";
import {Note, bodyToNote} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

export function addController(req: Request, res: Response, next: NextFunction) {
  if (req.body && req.body.add) {
    // user clicked "add" btn: add the new note
    let note: Note = bodyToNote(req.body);
    // todo
    // if everything is okey, redirect to index, otherwise render page (in callback of noteStore.add(...))
    if(true) {
      res.redirect('/');
    }
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