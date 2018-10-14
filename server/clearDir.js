const fs = require('fs');

module.exports = function ClearDir(baseDir) {
  fs.readdirSync(baseDir).forEach((file) => {
    if (!fs.statSync(`${baseDir}${file}`).isDirectory()) {
      fs.unlinkSync(`${baseDir}${file}`);
    }
  });
};
