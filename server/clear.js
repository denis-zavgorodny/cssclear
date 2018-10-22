const postcss = require('postcss');
const fs = require('fs');
const path = require('path');

const clearDir = require('./clearDir');
const prepareDir = require('./prepareDir');
const folderWalker = require('./folderWalker');
const normalizeSelectorsJSON = require('./normalizeSelectors');

const notBaseDir = new Error('Base directory is not exists');
const notDestDir = new Error('Destination directory is not exists');

module.exports = function clear(baseDir, destDir, destFilterFile = 'clear.json', createSourceMap = false) {
  if (!baseDir.match(/\/$/)) {
    baseDir += '/';
  }
  if (!destDir.match(/\/$/)) {
    destDir += '/';
  }
  if (!fs.existsSync(baseDir)) {
    throw notBaseDir;
  }
  if (!destDir) {
    throw notDestDir;
  }
  const filteredCSS = normalizeSelectorsJSON(JSON.parse(fs.readFileSync(`${destFilterFile}`).toString()));
  if (fs.existsSync(destDir)) {
    clearDir(destDir);
  } else {
    fs.mkdirSync(destDir);
  }
  const cssRAW = folderWalker(baseDir, [], baseDir);
  
  cssRAW.map((style) => {
    postcss((ast) => {  
      ast.walkRules(/^\D/, (rule) => {
        const selectors = [];
        const { selector } = rule;
        selectors.push(...selector.replace('\n', '').split(','));
        const filteredSelector = selectors.map(el => el.trim()).filter((el) => {
          const elAlternative = el.replace(/(>?\s?:[\S]+)/g, '');
          return filteredCSS.reduce((acc, current) => {
            if (acc !== true) {
              return (current === el || current === elAlternative)
            }
            return true;
          }, false);
        });
        if (filteredSelector.length) {
          rule.selector = filteredSelector.join(', ');
        } else {
          rule.remove();
        }
      });
    }).process(style.data, {
      from: `${style.baseDir}${style.name}`,
      to: `${destDir}${style.name}`,
      map: createSourceMap ? { inline: false } : false,
    }).then((result) => {
      const destinationPath = path.normalize(destDir + (style.dir ? `${style.dir}/` : '') + style.name);
      prepareDir(destinationPath);
      fs.writeFileSync(destinationPath, result.css);
      if (createSourceMap) {
        fs.writeFileSync(`${destinationPath}.map`, result.map);
      }
    });
    return null;
  });
}

