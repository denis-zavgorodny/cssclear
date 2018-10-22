const postcss = require('postcss');
const fs = require('fs');

const prepareDir = require('./prepareDir');
const folderWalker = require('./folderWalker');

const badParams = new Error('Base directory not exists');
const selectors = [];

module.exports = function parser(baseCSSDir, destSelectorFile = 'selectors.json') {
  if (!baseCSSDir.match(/\/$/)) {
    baseCSSDir += '/';
  }
  if (!fs.existsSync(baseCSSDir)) {
    throw badParams;
  }
  
  prepareDir(destSelectorFile);

  const cssRAW = folderWalker(baseCSSDir, []);
  const promises = [];
  cssRAW.map((el) => {
    const proc = postcss((ast) => {
      ast.walkRules(/^\D/, (rule) => {
        let { selector } = rule;
        selector = selector.replace('\n', '');
        selectors.push(...selector.split(','));
      });
    }).process(el.data, {
      from: el.name,
    }).then();

    promises.push(proc);
  });
  Promise.all(promises).then(() => {
    fs.writeFileSync(`${destSelectorFile}`, JSON.stringify(selectors));
  });
};
