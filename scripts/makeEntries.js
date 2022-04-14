const { glob } = require("glob");

function MakeEntries(
  pattern, 
  outputFolder,
  bundleFileName,
  withSubfolder = false
) {
  let files = glob.sync(pattern);
  let entries = {};

  for (let file of files) {
    let bundleFile = `${outputFolder}`;

    if (withSubfolder) {
      let fileSplitted = file.split(/\.|\//);
      let dir = fileSplitted[fileSplitted.length - 3];

      bundleFile += `/${dir}`;
    }

    bundleFile += `/${bundleFileName}`;

    if (!entries[bundleFile]) entries[bundleFile] = [];
    entries[bundleFile].push(file);
  }

  return entries;
}

module.exports = MakeEntries;