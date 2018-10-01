import * as express from 'express';
import * as core from "express-serve-static-core";
import addController from "../controller/addController";
import editController from "../controller/editController";

export const router: core.Router = express.Router();
export default router;

router.all('/add', addController);
router.all('/edit/:_id', editController);