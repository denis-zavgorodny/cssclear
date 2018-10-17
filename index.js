#!/usr/bin/env node
const cli = require('commander');

const parser = require('./server/parse');
const clear = require('./server/clear');
const initProject = require('./server/initProject');
const getVersion = require('./server/getVersion');

function toBoolean(value) {
  if (value === 'true') {
    return true;
  }
  return false;
}

cli.version(getVersion());

cli
  .command('index <base> <file>')
  .action((base, file) => {
    parser(base, file);
  });

cli
  .command('clear <base> <dest>')
  .option('-f, --filename <filename>', 'Name of source (JSON) file with CSS selectors', /([./a-zA-Z0-9_-]+\.json)/i, 'clear.json')
  .option('-s, --sourcemap <sourcemap>', 'Create SourceMap files?', toBoolean, false)
  .action((base, dest, opt) => {
    clear(base, dest, opt.filename, opt.sourcemap);
  });

cli
  .command('init <dir>')
  .action((dir) => {
    initProject(dir);
  });


cli.parse(process.argv);
