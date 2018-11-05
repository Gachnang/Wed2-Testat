"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hbs = require("hbs");
const style_1 = require("../model/style");
const order_1 = require("../model/order");
if (!hbs.handlebars.helpers.hasOwnProperty('valOrEmpty')) {
    hbs.handlebars.registerHelper('valOrEmpty', (val) => {
        if (typeof val === 'undefined' || val === null) {
            return new hbs.handlebars.SafeString('');
        }
        return new hbs.handlebars.SafeString(val.toString());
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
    hbs.handlebars.registerHelper('availableStyles', (styleName, screenreader = false) => {
        let ret = ('<div class="availableStyles">' + (screenreader ? ('<form method="get" id="formStyle"><label>Style:<select name="style">') : ('<label>Style:</label>' +
            '<div class="comboBox">' +
            '<button>' + styleName + '</button>' +
            '<div class="content">')));
        for (let entry in Object.keys(style_1.Style).filter(key => !isNaN(Number(style_1.Style[key])))) {
            ret += screenreader ? ('<option value="' + entry + '"' + (style_1.Style[entry] == styleName ? ' selected="selected"' : '') + '>' + style_1.Style[entry] + '</option>') : ('<form method="get">' +
                '<button type="submit" name="style" value="' + entry + '"' +
                (style_1.Style[entry] == styleName ? 'disabled' : '') + '>' +
                style_1.Style[entry] +
                '</button>' +
                '</form>');
        }
        return new hbs.handlebars.SafeString(ret + (screenreader ? ('</select></label></form><button type="submit" form="formStyle">Apply style</button>') : ('</div>' +
            '</div>')) +
            '</div>');
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('filter')) {
    hbs.handlebars.registerHelper('filter', (filter, screenreader = false) => {
        return new hbs.handlebars.SafeString('<div class="filter">' + (screenreader ? ('<form id="formFilter" method="get">' +
            '<label>Show:' +
            '<select name="filter">' +
            '<option value=""' + (filter === null ? ' selected="selected"' : '') + '>all</option>' +
            '<option value="true"' + (filter === true ? ' selected="selected"' : '') + '>finished</option>' +
            '<option value="false"' + (filter === false ? ' selected="selected"' : '') + '>not finished</option>' +
            '</select>' +
            '</label>' +
            '</form>' +
            '<button type="submit" form="formFilter">Apply filter</button>') : ('<label>Show:</label>' +
            '<div class="comboBox">' +
            '<button>' + (filter === null ? 'all' : filter === true ? 'finished' : 'not finished') + '</button>' +
            '<div class="content">' +
            '<form method="get">' +
            '<button type="submit" name="filter" value=""' + (filter === null ? ' disabled' : '') + '>all</button>' +
            '</form>' +
            '<form method="get">' +
            '<button type="submit" name="filter" value="true"' + (filter === true ? ' disabled ' : '') + '>finished</button>' +
            '</form>' +
            '<form method="get">\n' +
            '<button type="submit" name="filter" value="false" ' + (filter === false ? 'disabled ' : '') + '>not finished</button>' +
            '</form>' +
            '</div>' +
            '</div>')) + '</div>');
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('availableOrders')) {
    hbs.handlebars.registerHelper('availableOrders', (currentOrder, screenreader = false) => {
        let ret = ('<div class="orders left">' + (screenreader ? ('<form method="get" id="formOrder"><label>Order:<select name="order">') : ('<label>Order:</label><div class="content">')));
        for (let entry in Object.keys(order_1.Order).filter(key => !isNaN(Number(order_1.Order[key])))) {
            if (!screenreader && order_1.Order[entry].endsWith('Desc')) {
                let currentOrderEntry = order_1.Order[currentOrder].replace('Desc', '').replace('Asc', '');
                let currentOrderType = order_1.Order[currentOrder].replace(currentOrderEntry, '');
                let orderEntry = order_1.Order[entry].replace('Desc', '');
                ret += '<form method="get">' +
                    '<button type="submit" name="order" value="' + order_1.Order[(orderEntry +
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
if (!hbs.handlebars.helpers.hasOwnProperty('notesList')) {
    hbs.handlebars.registerHelper('notesList', (notes, screenreader = false, options) => {
        if (notes && Array.isArray(notes) && notes.length > 0) {
            let ret = '';
            for (let note of notes) {
                ret += hbs.handlebars.helpers['notesEntry'](note, screenreader).toString();
            }
            return new hbs.handlebars.SafeString(ret);
        }
        else {
            return new hbs.handlebars.SafeString('<div class="noNotes">No notes found</div>');
        }
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('notesEntry')) {
    hbs.handlebars.registerHelper('notesEntry', (note, screenreader = false) => {
        let ret = ('<div class="noteEntry">' +
            '<header>' +
            '<div class="importance">');
        for (let i = 0; i < note.importance; i++) {
            ret += '<span class="importanceSymbol"></span>\n';
        }
        let timeLeft = getTimeLeft(note.date);
        ret += ('</div>' +
            '<div class="noteEntryTimeLeft">' + (timeLeft.value < 0 ? 'since ' + Math.abs(timeLeft.value) : 'in ' + timeLeft.value) + ' ' + timeLeft.unit + '</div>' +
            '<h4 class="noteEntryTitle">' + note.title + '</h4>' +
            '</header>' +
            '<main>' +
            '<div class="noteEntryFinished left"' + (note.finished ? 'data-finished>Finished' : '>Not finished') + '</div>' +
            '<textarea class="noteEntryDescription left" readonly>' + note.description + '</textarea>' +
            '<div class="noteEntryEdit right">' +
            '<form class="left" method="post" action="/edit">' +
            '<button type="submit" name="_id" value="' + note._id + '">Edit</button>' +
            '</form>' +
            '</div>' +
            '</main>' +
            '</div>');
        return new hbs.handlebars.SafeString(ret);
    });
}
function getTimeLeft(date) {
    let left = (date.valueOf() - new Date().valueOf()) / 1000;
    let abs = left >= 0 ? 1 : -1;
    left = Math.abs(left);
    if (left < 60) {
        return { value: Math.floor(abs * left), unit: 'seconds' };
    }
    else if ((left /= 60) < 60) {
        return { value: Math.floor(abs * left), unit: 'minutes' };
    }
    else if ((left /= 60) < 24) {
        return { value: Math.floor(abs * left), unit: 'hours' };
    }
    else if ((left /= 24) < 30) {
        return { value: Math.floor(abs * left), unit: 'days' };
    }
    else if ((left /= 30) < 12) {
        return { value: Math.floor(abs * left), unit: 'months' };
    }
    else {
        return { value: Math.floor(abs * left), unit: 'years' };
    }
}
//# sourceMappingURL=handlebarHelpers.js.map