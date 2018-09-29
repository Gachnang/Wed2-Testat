"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const index_1 = require("./index");
const edit_1 = require("./edit");
const sessionController_1 = require("../controller/sessionController");
exports.router = express.Router();
exports.router.use('/', sessionController_1.SessionController);
exports.router.all('/', index_1.default);
exports.router.all('/:method', edit_1.default);
//# sourceMappingURL=routers.js.map