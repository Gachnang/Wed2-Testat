import * as express from 'express';
import * as core from "express-serve-static-core";
import {IndexOptions} from "../views/handlebarOptions";
import Style from "../model/style";

require('../views/handlebarHelpers');

export const router: core.Router = express.Router();
export default router;

/* GET home page. */
router.all('/', function(req, res, next) {
  res.render('index', {
    title: 'Note Pro',
    filter: req.session.filterFinished,
    styleName: Style[req.session.style],
    order: req.session.order,
    screenreader: req.session.screenreader,
    DEBUG: JSON.stringify(req.session)
  } as IndexOptions);
});