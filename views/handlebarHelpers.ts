import * as hbs from 'hbs';
import { Style } from '../model/style';
import { Order } from "../model/order";

if(!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
  hbs.handlebars.registerHelper('availableStyles', (styleName: string, screenreader: boolean = false) => {
    let ret: string = (
      '<div class="availableStyles">' + (
        screenreader ? (
          '<form method="post" id="formStyle"><label>Style:<select name="option:style">'
        ) : (
          '<label>Style:</label>' +
          '<div class="comboBox">' +
          '<button>' + styleName + '</button>' +
            '<div class="content">')
      )
    );

    for (let entry in Object.keys(Style).filter(key => !isNaN(Number(Style[key])))) {
      ret += screenreader ? (
        '<option value="' + entry + '"' + (Style[entry] == styleName ? ' selected="selected"' : '') +'>' + Style[entry] + '</option>'
      ) : (
        '<form method="post">' +
          '<button type="submit" name="option:style" value="' + entry + '"' +
          (Style[entry] == styleName ? 'disabled' : '') + '>' +
          Style[entry] +
          '</button>' +
        '</form>');
    }

    return new hbs.handlebars.SafeString(
      ret + (
      screenreader ? (
        '</select></label></form><button type="submit" form="formStyle">Apply style</button>'
      ) : (
          '</div>' +
        '</div>')
      ) +
      '</div>');
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('filterFinished')) {
  hbs.handlebars.registerHelper('filterFinished', (filter: boolean | null, screenreader: boolean = false) => {
    return new hbs.handlebars.SafeString(
    '<div class="filterFinished">' + (
        screenreader ? (
          '<form id="formFilter" method="post">' +
            '<label>Show:' +
              '<select name="option:filterFinished">' +
                '<option value=""' + (filter === null ? ' selected="selected"' : '') + '>all</option>' +
                '<option value="true"' + (filter === true ? ' selected="selected"' : '') + '>finished</option>' +
                '<option value="false"' + (filter === false ? ' selected="selected"' : '') + '>not finished</option>' +
              '</select>' +
            '</label>' +
          '</form>' +
          '<button type="submit" form="formFilter">Apply filter</button>'
        ) : (
          '<label>Show:</label>' +
          '<div class="comboBox">' +
            '<button>' + (filter === null ? 'all' : filter === true ? 'finished' : 'not finished') + '</button>' +
            '<div class="content">' +
              '<form method="post">' +
                '<button type="submit" name="option:filterFinished" value=""' + (filter === null ? ' disabled' : '') + '>all</button>' +
              '</form>' +
              '<form method="post">' +
                '<button type="submit" name="option:filterFinished" value="true"' + (filter === true ?  ' disabled ' : '') + '>finished</button>' +
              '</form>' +
              '<form method="post">\n' +
                '<button type="submit" name="option:filterFinished" value="false" ' + (filter === false ?  'disabled ' : '') + '>not finished</button>' +
              '</form>' +
            '</div>' +
          '</div>'
        )
      ) + '</div>');
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('availableOrders')) {
  hbs.handlebars.registerHelper('availableOrders', (currentOrder: Order, screenreader: boolean = false) => {
    let ret: string = (
      '<div class="orders left">' + (
        screenreader ? (
          '<form method="post" id="formOrder"><label>Order:<select name="option:order">'
        ) : (
          '<label>Order:</label><div class="content">'
        )
      )
    );

    for (let entry in Object.keys(Order).filter(key => !isNaN(Number(Order[key])))) {
      if (!screenreader && Order[entry].endsWith('Desc')) {
        let currentOrderEntry: string = Order[currentOrder].replace('Desc', '').replace('Asc', '');
        let currentOrderType: string = Order[currentOrder].replace(currentOrderEntry, '');
        let orderEntry: string = Order[entry].replace('Desc', '');

        ret += '<form method="post">' +
            '<button type="submit" name="option:order" value="' + Order[(orderEntry +
            (currentOrderEntry === orderEntry ? (currentOrderType === 'Desc' ? 'Asc' : 'Desc' ) : ('Desc'))
          )]  + '"' +
            (currentOrderEntry === orderEntry ? ' data-orderType="' + currentOrderType + '"' : '') + '>' + orderEntry + '</button>' +
          '</form>';
      } else if (screenreader)  {
        ret += '<option value="' + entry + '"' + (
          Order[currentOrder] === Order[entry] ? ' selected="selected"' : '') +
          '>' + Order[entry] + '</option>';
      }
    }

    return new hbs.handlebars.SafeString(ret + (
      screenreader ? (
        '</select></label></form><button type="submit" form="formOrder">Apply order</button>'
      ) : (
        '</div>'
      )
    ) + '</div>');
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('ifTwo')) {
  hbs.handlebars.registerHelper('ifTwo', (conditionOne: any, conditionTwo: any, options: any) => {
    return (conditionOne && conditionTwo) ? options.fn(this) : options.inverse(this);
  });
}