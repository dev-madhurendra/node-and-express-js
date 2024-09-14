const fs = require('fs');

const readTxtFile = (file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('Text file content:', data);
  });
}

module.exports = { readTxtFile }
