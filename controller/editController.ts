import { NextFunction, Request, Response } from "express-serve-static-core";
import {Note, bodyToNote, validate} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

const debug: (msg: string) => void = require('debug')('EditController');

export abstract class EditController {
  static renderContent(req: Request, res: Response, note: Note) {
    res.render('edit', {
      _id: req.params._id,
      title: 'Note Pro - Edit',
      styleName: Style[req.session.style],
      screenreader: req.session.screenreader,
      note: bodyToNote(note),
      DEBUG1: JSON.stringify(req.session),
      DEBUG2: JSON.stringify(req.body)
    } as EditOptions);
  }

  static get(req: Request, res: Response, next: NextFunction) {
    noteStore.get(req.params._id, (err: Error, note: Note) => {
      if (err) {
        next(err);
      } else {
        EditController.renderContent(req, res, note);
      }
    });
  }

  static post(req: Request, res: Response, next: NextFunction) {
    if(req.body.save) {
      let note: Note = bodyToNote(req.body);
      if (req.params._id) {
        note._id = req.params._id;
      }

      // HTML should check values before updating, but we do it twice:
      let errors = validate(note);
      if (errors.length > 0) {
        debug('Validation of note failed!');

        // validate failed.. re-render
        EditController.renderContent(req, res, note);
        return;
      }

      noteStore.update(note, (err: Error) => {
        if (err) {
          // save failed.. re-render
          EditController.renderContent(req, res, note);
        } else {
          res.redirect('/');
        }
      });
    }
  }
}
export default EditController;