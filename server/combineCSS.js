const fs = require('fs');
module.exports = function combineCSS(sourse, destination) {
  if (!fs.existsSync(sourse)) {
    console.log(`File ${sourse} does not exist`);
    return;
  }
  const data = fs.readFileSync(sourse);
  try {
    let selectors = [];
    const dataJSON = JSON.parse(data);
    for (let key in dataJSON) {
      selectors = [...dataJSON[key]];
    }
    fs.writeFileSync(destination, JSON.stringify(selectors));
  } catch (error) {
    console.error(error);
  }
}
