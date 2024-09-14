const readTextFile = require('./readFiles/readTextFile')
const readJsonFile = require('./readFiles/readJsonFile')
const readCSVFile = require('./readFiles/readCSVFile')
const createAndWriteTextFile = require('./writeFiles/createAndWriteTextFile')
const application = require('./application/application')

// readTextFile.readTxtFile("files/example.txt");
// readJsonFile.readJsonFile("files/example.json");
// readCSVFile.readCSV("files/example.csv");
// createAndWriteTextFile.writeFile();
application.isFileExists("./package.json", (isExists) => {
  if (isExists) {
    console.log("File exists !")
  } else {
    console.log("File doesn't exists !")
  }
})

