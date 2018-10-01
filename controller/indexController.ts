import Style from "../model/style";
import { IndexOptions } from "../views/handlebarOptions";
import { NextFunction, Request, Response } from "express-serve-static-core";
import noteStore from "../model/noteStore";
import {Note} from "../model/note";

export function indexController(req: Request, res: Response, next: NextFunction) {
  noteStore.getAll((err: Error, notes: Note[]) => {
    if (err) {
      next(err);
    } else {
      res.render('index', {
        title: 'Note Pro',
        filter: req.session.filter,
        styleName: Style[req.session.style],
        order: req.session.order,
        screenreader: req.session.screenreader,
        notes: notes,
        DEBUG: JSON.stringify(req.session)
      } as IndexOptions);
    }
  }, req.session.order, req.session.filter);
}
export default indexController;