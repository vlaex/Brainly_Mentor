const { src, dest } = require("gulp");
const gulpChange = require("gulp-change");
const mergeDeep = require("merge-deep");

module.exports = function moveManifest() {
  const manifestData = { 
    version: process.env.npm_package_version 
  };

  return src("manifest.json")
    .pipe(
      gulpChange(content => {
        let json = JSON.parse(content);
        return JSON.stringify(mergeDeep(json, manifestData));
      })
    )
    .pipe(dest("build"));
}