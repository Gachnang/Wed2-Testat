"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Order;
(function (Order) {
    Order[Order["finishedAsc"] = 0] = "finishedAsc";
    Order[Order["finishedDesc"] = 1] = "finishedDesc";
    Order[Order["titleAsc"] = 2] = "titleAsc";
    Order[Order["titleDesc"] = 3] = "titleDesc";
    Order[Order["descriptionAsc"] = 4] = "descriptionAsc";
    Order[Order["descriptionDesc"] = 5] = "descriptionDesc";
    Order[Order["createdAsc"] = 6] = "createdAsc";
    Order[Order["createdDesc"] = 7] = "createdDesc";
    Order[Order["priorityAsc"] = 8] = "priorityAsc";
    Order[Order["priorityDesc"] = 9] = "priorityDesc";
})(Order = exports.Order || (exports.Order = {}));
exports.default = Order;
function getComparator(order) {
    switch (order) {
        case Order.priorityDesc: return (a, b) => {
            return a.priority - b.priority;
        };
        case Order.priorityAsc: return (a, b) => {
            return b.priority - a.priority;
        };
        // todo make all comparators
        default: return null;
    }
}
exports.getComparator = getComparator;
//# sourceMappingURL=order.js.map