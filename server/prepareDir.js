const path = require('path');
const fs = require('fs');


module.exports = function prepareDir(dest) {
  const destDir = path.dirname(dest);
  destDir.split(path.sep).reduce((currentPath, folder) => {
    const current = `${currentPath}${folder}${path.sep}`;
    if (!fs.existsSync(current)) {
      fs.mkdirSync(current);
    }
    return current;
  }, '');
};
