#!/usr/bin/env node
const cli = require('commander');

const parser = require('./server/parse');
const clear = require('./server/clear');
const combineCSS = require('./server/combineCSS');
const initProject = require('./server/initProject');

function toBoolean(value) {
  if (value === 'true') {
    return true;
  }
  return false;
}

cli.version('0.0.3');

cli
  .command('index <base> <file>')
  .action((base, file) => {
    parser(base, file);
  });

cli
  .command('clear <base> <dest>')
  .option('-f, --filename <filename>', 'Name of source (JSON) file with CSS selectors', /([./a-zA-Z0-1_-]+\.json)/i, 'clear.json')
  .option('-s, --sourcemap <sourcemap>', 'Create SourceMap files?', toBoolean, false)
  .action((base, dest, opt) => {
    clear(base, dest, opt.filename, opt.sourcemap);
  });

cli
  .command('convert <file> <dest>')
  .action((file, dest) => {
    combineCSS(file, dest);
  });

cli
  .command('init <dir>')
  .action((dir) => {
    initProject(dir);
  });


cli.parse(process.argv);
