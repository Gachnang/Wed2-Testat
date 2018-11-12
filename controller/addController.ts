import { Request, Response } from "express-serve-static-core";
import {Note, bodyToNote, validate} from "../model/note";
import Style from "../model/style";
import {EditOptions} from "../views/handlebarOptions";
import noteStore from "../model/noteStore";

const debug: (msg: string) => void = require('debug')('AddController');


export abstract class AddController {
  static renderContent(req: Request, res: Response) {
    res.render('edit', {
      title: 'Note Pro - Add',
      styleName: Style[req.session.style],
      screenreader: req.session.screenreader,
      note: bodyToNote(req.body),
      DEBUG1: JSON.stringify(req.session),
      DEBUG2: JSON.stringify(req.body)
    } as EditOptions);
  }

  static get(req: Request, res: Response) {
    AddController.renderContent(req, res);
  }

  static post(req: Request, res: Response) {
    if (req.body.cancel) {
      res.redirect('/');
    } else if (req.body.add) {
      // user clicked "add" btn: add the new note
      let note: Note = bodyToNote(req.body);
      // HTML should check values before updating, but we do it twice:
      let errors = validate(note);
      if (errors.length > 0) {
        debug('Validation of note failed!');

        AddController.renderContent(req, res);
        // validate failed.. re-render
        return;
      }

      noteStore.insert(note, (err: Error) => {
        if (err) {
          // save failed.. re-render
          AddController.renderContent(req, res);
        } else {
          res.redirect('/');
        }
      });
    } else {
      AddController.renderContent(req, res);
    }
  }
}
export default AddController;