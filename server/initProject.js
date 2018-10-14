const fs = require('fs');
const path = require('path');
const prepareDir = require('./prepareDir');
module.exports = function initProject(destinationDir) {
  const resourceDir = path.join(__dirname, '../www-build');
  console.log(resourceDir);
  fs.readdirSync(path.resolve(resourceDir)).map((file) => {
    const copyTo = path.resolve(`${destinationDir}/${file}`);
    prepareDir(copyTo);
    fs.copyFileSync(path.resolve(`${resourceDir}/${file}`), copyTo);
  });
};
