const postcss = require('postcss');
const fs = require('fs');

const prepareDir = require('./prepareDir');

const badParams = new Error('Base directory not exists');
const cssRAW = [];
const selectors = [];

module.exports = function parser(baseCSSDir, destSelectorFile = 'selectors.json') {
  if (!fs.existsSync(baseCSSDir)) {
    throw badParams;
  }
  
  prepareDir(destSelectorFile);

  fs.readdirSync(baseCSSDir).forEach((file) => {
    if (!fs.statSync(`${baseCSSDir}${file}`).isDirectory() && file.indexOf('.css') !== -1) {
      cssRAW.push({
        name: file,
        data: fs.readFileSync(`${baseCSSDir}${file}`).toString(),
      });
    }
  });
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
