import * as hbs from 'hbs';

if(!hbs.handlebars.helpers.hasOwnProperty('availableStyles')) {
  hbs.handlebars.registerHelper('availableStyles', (context) => {
    let ret: string = '';
    for (let entry in Object.keys(context).filter(key => !isNaN(Number(context[key])))) {
      ret += (
        '<form method="post">\n' +
        '  <button type="submit" name="option:style" value="' + entry + '">\n' +
        context[entry] + '\n' +
        '  </button>\n' +
        '</form>\n');
    }
    return new hbs.handlebars.SafeString(ret);
  });
}
