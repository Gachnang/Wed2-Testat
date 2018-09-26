import * as express from 'express';

import indexRouter from './index';
import {SessionController} from "../controller/sessionController";

export const router = express.Router();

router.use('/', SessionController);
router.all('/', indexRouter);