import * as hbs from 'hbs';
import { Style } from '../model/style';
import { Order } from "../model/order";
import {Note} from "../model/note";

if(!hbs.handlebars.helpers.hasOwnProperty('valOrEmpty')) {
  hbs.handlebars.registerHelper('valOrEmpty', (val: any) => {
    if (typeof val === 'undefined' || val === null) {
      return new hbs.handlebars.SafeString('');
    }
    if (typeof val === 'object' && !isNaN((val as Date).getTime())) {
      return new hbs.handlebars.SafeString((val as Date).toISOString().substring(0, 10));
    }
    return new hbs.handlebars.SafeString(val.toString());
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('valOrToday')) {
  hbs.handlebars.registerHelper('valOrToday', (val: any) => {
    if (typeof val === 'undefined' || val === null) {
      val = new Date();
    }
    if (typeof val === 'object' && !isNaN((val as Date).getTime())) {
      return new hbs.handlebars.SafeString((val as Date).toISOString().substring(0, 10));
    }
    return new hbs.handlebars.SafeString(val.toString());
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
  hbs.handlebars.registerHelper('availableStyles', (styleName: string, screenreader: boolean = false) => {
    let ret: string = (
      '<div class="availableStyles">' + (
        screenreader ? (
          '<form method="get" id="formStyle"><label>Style:<select name="style">'
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
        '<form method="get">' +
          '<button type="submit" name="style" value="' + entry + '"' +
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

if(!hbs.handlebars.helpers.hasOwnProperty('filter')) {
  hbs.handlebars.registerHelper('filter', (filter: boolean | null, screenreader: boolean = false) => {
    return new hbs.handlebars.SafeString(
    '<div class="filter">' + (
        screenreader ? (
          '<form id="formFilter" method="get">' +
            '<label>Show:' +
              '<select name="filter">' +
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
              '<form method="get">' +
                '<button type="submit" name="filter" value=""' + (filter === null ? ' disabled' : '') + '>all</button>' +
              '</form>' +
              '<form method="get">' +
                '<button type="submit" name="filter" value="true"' + (filter === true ?  ' disabled ' : '') + '>finished</button>' +
              '</form>' +
              '<form method="get">' +
                '<button type="submit" name="filter" value="false" ' + (filter === false ?  'disabled ' : '') + '>not finished</button>' +
              '</form>' +
            '</div>' +
          '</div>'
        )
      ) + '</div>');
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('availableOrders')) {
  hbs.handlebars.registerHelper('availableOrders', (currentOrder: Order, screenreader: boolean = false) => {
    let ret: string = '<label>Order:</label>';

    for (let entry in Object.keys(Order).filter(key => !isNaN(Number(Order[key])))) {
      if (!screenreader && Order[entry].endsWith('Desc')) {
        let currentOrderEntry: string = Order[currentOrder].replace('Desc', '').replace('Asc', '');
        let currentOrderType: string = Order[currentOrder].replace(currentOrderEntry, '');
        let orderEntry: string = Order[entry].replace('Desc', '');

        ret += '<form method="get">' +
            '<button type="submit" name="order" value="' + Order[(orderEntry +
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
      screenreader ? '</select></label></form><button type="submit" form="formOrder">Apply order</button>' : ''
    ));
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('notesList')) {
  hbs.handlebars.registerHelper('notesList', (notes: Note[], screenreader: boolean = false) => {
    if (notes && Array.isArray(notes) && notes.length > 0) {
      let ret: string = '';
      for (let note of notes) {
        ret += hbs.handlebars.helpers['notesEntry'](note, screenreader).toString();
      }
      return new hbs.handlebars.SafeString(ret);
    } else {
      return new hbs.handlebars.SafeString('<div class="noNotes">No notes found</div>');
    }
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('notesEntry')) {
  hbs.handlebars.registerHelper('notesEntry', (note: Note) => {
    let ret: string = (
      '<div class="noteEntry">' +
        '<header>' +
          '<div class="importance">');

    for (let i = 0; i < note.importance; i++) {
      ret += '<span class="importanceSymbol"></span>\n';
    }

    let timeLeft: {value: number, unit: string} = getTimeLeft(note.date);

    ret += (
          '</div>' +
            '<div class="noteEntryTimeLeft">' + (timeLeft.value < 0 ? 'since '  + Math.abs(timeLeft.value) : 'in ' + timeLeft.value) + ' ' + timeLeft.unit + '</div>' +
            '<h4 class="noteEntryTitle">' + note.title +'</h4>' +
          '</header>' +
          '<main>' +
            '<div class="noteEntryFinished"' + (note.finished ? 'data-finished>Finished' : '>Not finished') + '</div>' +
            '<textarea class="noteEntryDescription" readonly>' + note.description + '</textarea>' +
            '<div class="noteEntryEdit right">' +
            '<form method="get" action="/edit/' + note._id + '">' +
              '<button type="submit">Edit</button>' +
            '</form>' +
          '</div>' +
        '</main>' +
      '</div>'
    );

    return new hbs.handlebars.SafeString(ret);
  });
}

function getTimeLeft(date: Date): {value: number, unit: string} {
  let left: number = (date.valueOf() - new Date().valueOf()) / 1000;
  let abs = left >= 0 ? 1 : -1;
  left = Math.abs(left);

  if (left < 60) {
    return { value: Math.floor(abs * left), unit: 'seconds' };
  } else if ((left /= 60) < 60) {
    return { value: Math.floor(abs * left), unit: 'minutes'};
  } else if ((left /= 60) < 24) {
    return { value: Math.floor(abs * left), unit: 'hours'};
  } else if ((left /= 24) < 30) {
    return { value: Math.floor(abs * left), unit: 'days'};
  } else if ((left /= 30) < 12) {
    return { value: Math.floor(abs * left), unit: 'months'};
  } else {
    return { value: Math.floor(abs * left), unit: 'years'};
  }
}

