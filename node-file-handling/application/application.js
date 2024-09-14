const fs = require('fs');

const isFileExists = (file, callback) => {
  fs.access(file, fs.constants.F_OK, (err) => {
    const isExists = !err;
    callback(isExists);
  })
}

module.exports = { isFileExists }

