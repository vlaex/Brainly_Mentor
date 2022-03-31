const { src, dest, pipe } = require("gulp");
const zip = require("gulp-zip");

const { version } = require("../../package.json");

module.exports = function zipExtension() {
  return src("build/**")
    .pipe(zip(
      `build__${version.replace(/\./g, "_")}.zip`
    ))
    .pipe(dest("./dist"));
}