"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const addController_1 = require("../controller/addController");
const editController_1 = require("../controller/editController");
exports.router = express.Router();
exports.default = exports.router;
exports.router.all('/add', addController_1.default);
exports.router.all('/edit/:_id', editController_1.default);
//# sourceMappingURL=edit.js.map