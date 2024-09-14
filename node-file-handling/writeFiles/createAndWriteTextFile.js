const fs = require('fs');

const data = 'Hello, this is a sample text written to a file.';

const writeFile = () => {
  fs.writeFile('files/writeFiles/example.txt', data, (err) => {
    if (err) {
      console.error('Error writing to the file:', err);
      return;
    }
    console.log('File has been created and written successfully.');
  });
}

module.exports = { writeFile }
