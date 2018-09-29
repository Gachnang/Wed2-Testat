"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hbs = require("hbs");
const style_1 = require("../model/style");
const order_1 = require("../model/order");
if (!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
    hbs.handlebars.registerHelper('availableStyles', (styleName, screenreader = false) => {
        let ret = ('<div class="availableStyles">' + (screenreader ? ('<form method="post" id="formStyle"><label>Style:<select name="option:style">') : ('<label>Style:</label>' +
            '<div class="comboBox">' +
            '<div class="content">')));
        for (let entry in Object.keys(style_1.Style).filter(key => !isNaN(Number(style_1.Style[key])))) {
            ret += screenreader ? ('<option value="' + entry + '"' + (style_1.Style[entry] == styleName ? ' selected="selected"' : '') + '>' + style_1.Style[entry] + '</option>') : ('<form method="post">' +
                '<button type="submit" name="option:style" value="' + entry + '"' +
                (style_1.Style[entry] == styleName ? 'disabled' : '') + '>' +
                style_1.Style[entry] +
                '</button>' +
                '</form>');
        }
        return new hbs.handlebars.SafeString(ret + (screenreader ? ('</select></label></form><button type="submit" form="formStyle">Apply style</button>') : ('</div>' +
            '<button>' + styleName + '</button>' +
            '</div>')) +
            '</div>');
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('filterFinished')) {
    hbs.handlebars.registerHelper('filterFinished', (filter, screenreader = false) => {
        return new hbs.handlebars.SafeString('<div class="filterFinished">' + (screenreader ? ('<form id="formFilter" method="post">' +
            '<label>Show:' +
            '<select name="option:filterFinished">' +
            '<option value=""' + (filter === null ? ' selected="selected"' : '') + '>all</option>' +
            '<option value="true"' + (filter === true ? ' selected="selected"' : '') + '>finished</option>' +
            '<option value="false"' + (filter === false ? ' selected="selected"' : '') + '>not finished</option>' +
            '</select>' +
            '</label>' +
            '</form>' +
            '<button type="submit" form="formFilter">Apply filter</button>') : ('<label>Show:</label>' +
            '<div class="comboBox">' +
            '<div class="content">' +
            '<form method="post">' +
            '<button type="submit" name="option:filterFinished" value=""' + (filter === null ? ' disabled' : '') + '>all</button>' +
            '</form>' +
            '<form method="post">' +
            '<button type="submit" name="option:filterFinished" value="true"' + (filter === true ? ' disabled ' : '') + '>finished</button>' +
            '</form>' +
            '<form method="post">\n' +
            '<button type="submit" name="option:filterFinished" value="false" ' + (filter === false ? 'disabled ' : '') + '>not finished</button>' +
            '</form>' +
            '</div>' +
            '<button>' + (filter === null ? 'all' : filter === true ? 'finished' : 'not finished') + '</button>' +
            '</div>')) + '</div>');
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('availableOrders')) {
    hbs.handlebars.registerHelper('availableOrders', (currentOrder, screenreader = false) => {
        let ret = ('<div class="orders left">' + (screenreader ? ('<form method="post" id="formOrder"><label>Order:<select name="option:order">') : ('<label>Order:</label><div class="content">')));
        for (let entry in Object.keys(order_1.Order).filter(key => !isNaN(Number(order_1.Order[key])))) {
            if (!screenreader && order_1.Order[entry].endsWith('Desc')) {
                let currentOrderEntry = order_1.Order[currentOrder].replace('Desc', '').replace('Asc', '');
                let currentOrderType = order_1.Order[currentOrder].replace(currentOrderEntry, '');
                let orderEntry = order_1.Order[entry].replace('Desc', '');
                ret += '<form method="post">' +
                    '<button type="submit" name="option:order" value="' + order_1.Order[(orderEntry +
                    (currentOrderEntry === orderEntry ? (currentOrderType === 'Desc' ? 'Asc' : 'Desc') : ('Desc')))] + '"' +
                    (currentOrderEntry === orderEntry ? ' data-orderType="' + currentOrderType + '"' : '') + '>' + orderEntry + '</button>' +
                    '</form>';
            }
            else if (screenreader) {
                ret += '<option value="' + entry + '"' + (order_1.Order[currentOrder] === order_1.Order[entry] ? ' selected="selected"' : '') +
                    '>' + order_1.Order[entry] + '</option>';
            }
        }
        return new hbs.handlebars.SafeString(ret + (screenreader ? ('</select></label></form><button type="submit" form="formOrder">Apply order</button>') : ('</div>')) + '</div>');
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('ifTwo')) {
    hbs.handlebars.registerHelper('ifTwo', (conditionOne, conditionTwo, options) => {
        return (conditionOne && conditionTwo) ? options.fn(this) : options.inverse(this);
    });
}
//# sourceMappingURL=handlebarHelpers.js.map