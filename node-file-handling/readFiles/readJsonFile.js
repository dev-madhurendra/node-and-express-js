const fs = require('fs');

const readJsonFile = (file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    const jsonData = JSON.parse(data);
    console.log('JSON content:', jsonData);
  });
}

module.exports = {readJsonFile}
