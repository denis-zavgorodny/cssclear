const fs = require('fs');
const path = require('path');

module.exports = function folderWalker(dir, list, base = '') {
  let baseName = dir;
  if (!dir.match(/\/$/)) {
    baseName += '/';
  }
  fs.readdirSync(baseName).forEach((file) => {
    const fullPath = `${baseName}${file}`;
    if (!fs.statSync(fullPath).isDirectory() && file.indexOf('.css') !== -1) {
      const normalizedName = path.normalize(base).replace(/\/$/, '');
      const normalizesDir = path.dirname(path.normalize(fullPath)).replace(normalizedName, '');
      list.push({
        name: file,
        dir: normalizesDir,
        data: fs.readFileSync(fullPath).toString(),
      });
    } 
    if (fs.statSync(fullPath).isDirectory()) {
      list = [...list, ...folderWalker(fullPath, list, base)];
    }
  });
  return list;
};
