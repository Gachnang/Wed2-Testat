import * as express from 'express';
import * as core from "express-serve-static-core";

interface IndexOptions {
  title: string;
}

export const router: core.Router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', <IndexOptions>{
    title: 'Express'
  });
});