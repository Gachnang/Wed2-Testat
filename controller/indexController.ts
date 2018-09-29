import Style from "../model/style";
import { IndexOptions } from "../views/handlebarOptions";
import { NextFunction, Request, Response } from "express-serve-static-core";

export function indexController(req: Request, res: Response, next: NextFunction) {
  res.render('index', {
    title: 'Note Pro',
    filter: req.session.filterFinished,
    styleName: Style[req.session.style],
    order: req.session.order,
    screenreader: req.session.screenreader,
    DEBUG: JSON.stringify(req.session)
  } as IndexOptions);
}
export default indexController;