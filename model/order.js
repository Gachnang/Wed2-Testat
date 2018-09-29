"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order;
(function (Order) {
    Order[Order["finishedAsc"] = 0] = "finishedAsc";
    Order[Order["finishedDesc"] = 1] = "finishedDesc";
    Order[Order["titleAsc"] = 2] = "titleAsc";
    Order[Order["titleDesc"] = 3] = "titleDesc";
    Order[Order["createdAsc"] = 4] = "createdAsc";
    Order[Order["createdDesc"] = 5] = "createdDesc";
    Order[Order["importanceAsc"] = 6] = "importanceAsc";
    Order[Order["importanceDesc"] = 7] = "importanceDesc";
})(Order = exports.Order || (exports.Order = {}));
exports.default = Order;
function getComparator(order) {
    switch (order) {
        case Order.importanceDesc: return (a, b) => {
            return a.importance - b.importance;
        };
        case Order.importanceAsc: return (a, b) => {
            return b.importance - a.importance;
        };
        // todo make all comparators
        default: return null;
    }
}
exports.getComparator = getComparator;
//# sourceMappingURL=order.js.map