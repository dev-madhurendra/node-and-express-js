const csv = require('csv-parser');
const fs = require('fs');

const readCSV = (file) => {
  fs.createReadStream(file)
  .pipe(csv())
  .on('data', (row) => {
      console.log('CSV Row:', row);
    }
  ).on('end', () => {
    console.log('CSV file processing complete');
  }
);

}

module.exports = {
  readCSV
}
