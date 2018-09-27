import * as hbs from 'hbs';
import Style from '../model/style';

if(!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
  hbs.handlebars.registerHelper('availableStyles', (styleName: string, screenreader: boolean = false) => {
    let ret: string = screenreader ?
      ('<form method="post" id="formStyle"><label>Style:<select name="option:style">') : (
        '<label>Style:</label>\n' +
        '<div class="comboBox">\n' +
        '  <div class="content">\n');

    for (let entry in Object.keys(Style).filter(key => !isNaN(Number(Style[key])))) {
      ret += screenreader ? ('<option value="' + entry + '"' + (Style[entry] == styleName ? ' selected="selected"' : '') +'>' + Style[entry] + '</option>') : (
        '<form method="post">\n' +
        '  <button type="submit" name="option:style" value="' + entry + '"' +
        (Style[entry] == styleName ? 'disabled' : '') + '>\n' +
        Style[entry] + '\n' +
        '  </button>\n' +
        '</form>\n');
    }

    return new hbs.handlebars.SafeString(ret +
      (screenreader ? ('</select></label></form><button type="submit" form="formStyle">Apply style</button>') : (
      '  </div>\n' +
      '  <button>' + styleName + '</button>\n' +
      '</div>\n')));
  });
}

if(!hbs.handlebars.helpers.hasOwnProperty('filterFinished')) {
  hbs.handlebars.registerHelper('filterFinished', (filter: boolean | null, screenreader: boolean = false) => {
    return screenreader ?
      new hbs.handlebars.SafeString(
        '<form id="formFilter" method="post">\n' +
        '  <label>Show:' +
        '    <select name="option:filterFinished">\n' +
        '      <option value=""' + (filter === null ? ' selected="selected"' : '') + '>all</option>\n' +
        '      <option value="true"' + (filter === true ? ' selected="selected"' : '') + '>finished</option>\n' +
        '      <option value="false"' + (filter === false ? ' selected="selected"' : '') + '>not finished</option>\n' +
        '    </select>\n' +
        '  </label>\n' +
        '</form>\n' +
        '<button type="submit" form="formFilter">Apply filter</button>'
      ) :
      new hbs.handlebars.SafeString(
        '<label>Show:</label>' +
        '<div class="comboBox">\n' +
        '  <div class="content">\n' +
        '    <form method="post">\n' +
        '      <button type="submit" name="option:filterFinished" value="" ' + (filter === null ? 'disabled' : '') + '>all</button>\n' +
        '    </form>\n' +
        '    <form method="post">\n' +
        '      <button type="submit" name="option:filterFinished" value="true" ' + (filter === true ?  'disabled ' : '') + '>finished</button>\n' +
        '    </form>\n' +
        '    <form method="post">\n' +
        '      <button type="submit" name="option:filterFinished" value="false" ' + (filter === false ?  'disabled ' : '') + '>not finished</button>\n' +
        '    </form>\n' +
        '  </div>\n' +
        '  <button>' + (filter === null ? 'all' : filter === true ? 'finished' : 'not finished') + '</button>\n' +
        '</div>\n'
      );
  });
}
