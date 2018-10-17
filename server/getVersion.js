const fs = require('fs');

module.exports = function getVersion() {
  const info = JSON.parse(fs.readFileSync('./package.json'));
  return info.version;
};
