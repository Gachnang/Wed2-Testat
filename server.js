"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
/// import * as bodyParser from 'body-parser';
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const routers_1 = require("./routes/routers");
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
app.use(routers_1.router);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=server.js.map