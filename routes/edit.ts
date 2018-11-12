import * as express from 'express';
import * as core from "express-serve-static-core";
import EditController from "../controller/editController";
import AddController from "../controller/addController";

export const router: core.Router = express.Router();
export default router;

router.get('/add', AddController.get);
router.post('/add', AddController.post);

router.get('/edit/:_id', EditController.get);
router.post('/edit/:_id', EditController.post);