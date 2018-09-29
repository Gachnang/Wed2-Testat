import * as express from 'express';

import indexRouter from './index';
import editRouter from './edit';
import {SessionController} from "../controller/sessionController";

// load handlebarHelpers
require('../views/handlebarHelpers');

export const router = express.Router();
export default router;

router.use('/', SessionController);
router.all('/', indexRouter);
router.all('/:method', editRouter);