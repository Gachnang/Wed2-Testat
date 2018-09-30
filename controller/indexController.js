"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("../model/style");
const noteStore_1 = require("../model/noteStore");
function indexController(req, res, next) {
    noteStore_1.default.getAll((err, notes) => {
        if (err) {
            next(err);
        }
        else {
            res.render('index', {
                title: 'Note Pro',
                filter: req.session.filterFinished,
                styleName: style_1.default[req.session.style],
                order: req.session.order,
                screenreader: req.session.screenreader,
                notes: notes,
                DEBUG: JSON.stringify(req.session)
            });
        }
    }, req.session.order, req.session.filterFinished);
}
exports.indexController = indexController;
exports.default = indexController;
//# sourceMappingURL=indexController.js.map