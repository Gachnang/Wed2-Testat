"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order;
(function (Order) {
    Order[Order["finishedAsc"] = 0] = "finishedAsc";
    Order[Order["dinishedDesc"] = 1] = "dinishedDesc";
    Order[Order["createdAsc"] = 2] = "createdAsc";
    Order[Order["createdDesc"] = 3] = "createdDesc";
    Order[Order["priorityAsc"] = 4] = "priorityAsc";
    Order[Order["priorityDesc"] = 5] = "priorityDesc";
})(Order = exports.Order || (exports.Order = {}));
var Style;
(function (Style) {
    Style[Style["White"] = 0] = "White";
    Style[Style["Red"] = 1] = "Red";
    Style[Style["Green"] = 2] = "Green";
    Style[Style["Blue"] = 3] = "Blue";
})(Style = exports.Style || (exports.Style = {}));
exports.DefaultOptions = {
    style: Style.White,
    order: Order.createdDesc
};
//# sourceMappingURL=options.js.map