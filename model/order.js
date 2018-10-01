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
        case Order.createdAsc: return (a, b) => {
            return a.created.valueOf() - b.created.valueOf();
        };
        case Order.createdDesc: return (a, b) => {
            return b.created.valueOf() - a.created.valueOf();
        };
        case Order.finishedDesc: return (a, b) => {
            let comp = (a.finished ? 1 : 0) - (b.finished ? 1 : 0);
            return comp !== 0 ? comp : a.date.valueOf() - b.date.valueOf();
        };
        case Order.finishedAsc: return (a, b) => {
            let comp = (b.finished ? 1 : 0) - (a.finished ? 1 : 0);
            return comp !== 0 ? comp : b.date.valueOf() - a.date.valueOf();
        };
        case Order.titleDesc: return (a, b) => {
            //return a.title.localeCompare(b.title);
            return a.title === b.title ? 0 : a.title > b.title ? 1 : -1;
        };
        case Order.titleAsc: return (a, b) => {
            return a.title === b.title ? 0 : a.title > b.title ? -1 : 1;
        };
        default: return null;
    }
}
exports.getComparator = getComparator;
//# sourceMappingURL=order.js.map