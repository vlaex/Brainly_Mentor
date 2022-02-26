const { glob } = require("glob");

module.exports = {
  GetFiles(pattern) {
    return glob.sync(pattern);
  },
  ExtractFolder(filePath) {
    let fileSplitted = filePath.split(/\.|\//);
    return fileSplitted[fileSplitted.length - 3];
  }
};