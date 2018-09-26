import * as express from 'express';

import { router as indexRouter } from './index';

export const router = express.Router();

router.get('/', indexRouter);