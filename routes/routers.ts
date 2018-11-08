import * as express from 'express';

import indexRouter from './index';
import editRouter from './edit';
import {SessionController} from "../controller/sessionController";

// load handlebarHelpers
require('../views/handlebarHelpers');

export const router = express.Router();
export default router;

// all use SessionController
router.use('/', SessionController);
router.all('/', indexRouter);
router.all('/*', editRouter);