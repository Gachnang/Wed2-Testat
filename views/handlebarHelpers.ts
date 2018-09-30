import * as hbs from 'hbs';
import { Style } from '../model/style';
import { Order } from "../model/order";
import {Note} from "../model/note";

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

if(!hbs.handlebars.helpers.hasOwnProperty('notesList')) {
  hbs.handlebars.registerHelper('notesList', (notes: Note[], screenreader: boolean = false, options: any) => {
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
  hbs.handlebars.registerHelper('notesEntry', (note: Note, screenreader: boolean = false) => {
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
            '<div class="noteEntryFinished left"' + (note.finished ? 'data-finished>Finished' : '>Not finished') + '</div>' +
            '<textarea class="noteEntryDescription left" readonly>' + note.description + '</textarea>' +
            '<div class="noteEntryEdit right">' +
            '<form class="left" method="post" action="/edit">' +
              '<button type="submit" name="_id" value="' + note._id + '">Edit</button>' +
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