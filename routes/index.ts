import * as express from 'express';
import * as core from "express-serve-static-core";
import indexController from "../controller/indexController";

export const router: core.Router = express.Router();
export default router;

/* GET home page. */
router.all('/', indexController);