const { watch, series } = require("gulp");

module.exports = function watchFiles() {
  watch([
    "src/styles/**/*.scss"
  ], series("sass"));
}