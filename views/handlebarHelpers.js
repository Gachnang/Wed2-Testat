"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hbs = require("hbs");
const style_1 = require("../model/style");
if (!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
    hbs.handlebars.registerHelper('availableStyles', (styleName, screenreader = false) => {
        let ret = screenreader ?
            ('<form method="post" id="formStyle"><label>Style:<select name="option:style">') : ('<label>Style:</label>' +
            '<div class="comboBox">' +
            '<div class="content">');
        for (let entry in Object.keys(style_1.default).filter(key => !isNaN(Number(style_1.default[key])))) {
            ret += screenreader ? ('<option value="' + entry + '"' + (style_1.default[entry] == styleName ? ' selected="selected"' : '') + '>' + style_1.default[entry] + '</option>') : ('<form method="post">' +
                '<button type="submit" name="option:style" value="' + entry + '"' +
                (style_1.default[entry] == styleName ? 'disabled' : '') + '>' +
                style_1.default[entry] +
                '</button>' +
                '</form>');
        }
        return new hbs.handlebars.SafeString(ret +
            (screenreader ? ('</select></label></form><button type="submit" form="formStyle">Apply style</button>') : ('</div>' +
                '<button>' + styleName + '</button>' +
                '</div>')));
    });
}
if (!hbs.handlebars.helpers.hasOwnProperty('filterFinished')) {
    hbs.handlebars.registerHelper('filterFinished', (filter, screenreader = false) => {
        return screenreader ?
            new hbs.handlebars.SafeString('<form id="formFilter" method="post">' +
                '<label>Show:' +
                '<select name="option:filterFinished">' +
                '<option value=""' + (filter === null ? ' selected="selected"' : '') + '>all</option>' +
                '<option value="true"' + (filter === true ? ' selected="selected"' : '') + '>finished</option>' +
                '<option value="false"' + (filter === false ? ' selected="selected"' : '') + '>not finished</option>' +
                '</select>' +
                '</label>' +
                '</form>' +
                '<button type="submit" form="formFilter">Apply filter</button>') :
            new hbs.handlebars.SafeString('<label>Show:</label>' +
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
                '</div>');
    });
}
//# sourceMappingURL=handlebarHelpers.js.map