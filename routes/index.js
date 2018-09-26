"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const style_1 = require("../model/style");
require('../views/handlebarHelpers');
exports.router = express.Router();
exports.default = exports.router;
/* GET home page. */
exports.router.all('/', function (req, res, next) {
    res.render('index', {
        title: 'Note Pro',
        availableStyles: style_1.default,
        styleName: style_1.default[req.session.style],
        DEBUG: JSON.stringify(req.session)
    });
});
//# sourceMappingURL=index.js.map