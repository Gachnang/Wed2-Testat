import * as http from 'http';
import * as express from 'express';
/// import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as createError from 'http-errors';

import { router } from './routes/routers';
import noteStore from "./model/noteStore";
import {Note} from "./model/note";

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middlewares
/// app.use(bodyParser.urlencoded({extended: false}));
/// app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



/** DEBUG: remove afterwards!! *
noteStore.getAll((err: Error, notes: Note[]) => {
  if (!notes || notes.length === 0) {
    noteStore.insert({
      title: 'Debug test entry bla blubb',
      description: 'this is just a testEntry bla blubb',
      finished: true,
      importance: 3,
      date: new Date()}, () => {});
  }
});
/**/


const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
