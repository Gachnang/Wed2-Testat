"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("../model/style");
function indexController(req, res, next) {
    res.render('index', {
        title: 'Note Pro',
        filter: req.session.filterFinished,
        styleName: style_1.default[req.session.style],
        order: req.session.order,
        screenreader: req.session.screenreader,
        DEBUG: JSON.stringify(req.session)
    });
}
exports.indexController = indexController;
exports.default = indexController;
//# sourceMappingURL=indexController.js.map