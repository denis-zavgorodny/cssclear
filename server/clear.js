const postcss = require('postcss');
const fs = require('fs');
const clearDir = require('./clearDir');
const normalizeSelectorsJSON = require('./normalizeSelectors');

const cssRAW = [];
const notBaseDir = new Error('Base directory is not exists');
const notDestDir = new Error('Destination directory is not exists');

module.exports = function clear(baseDir, destDir, destFilterFile = 'clear.json', createSourceMap = false) {
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
  
  fs.readdirSync(baseDir).forEach((file) => {
    if (!fs.statSync(`${baseDir}${file}`).isDirectory() && file.indexOf('.css') != -1) {
      cssRAW.push({
        name: file,
        baseDir,
        data: fs.readFileSync(`${baseDir}${file}`).toString(),
      });
    }
  });
  
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
      fs.writeFileSync(`${destDir}${style.name}`, result.css);
      if (createSourceMap) {
        fs.writeFileSync(`${destDir}${style.name}.map`, result.map);
      }
    });
    return null;
  });
}

