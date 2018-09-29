"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const indexController_1 = require("../controller/indexController");
exports.router = express.Router();
exports.default = exports.router;
/* GET home page. */
exports.router.all('/', indexController_1.default);
//# sourceMappingURL=index.js.map