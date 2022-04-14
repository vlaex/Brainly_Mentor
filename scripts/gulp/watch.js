const { watch, series } = require("gulp");

module.exports = function watchFiles() {
  watch(["src/styles/**/*.scss"], series("scss")),
  watch([
    "src/icons",
    "src/_locales/**/*.json",
    "src/assets"
  ], series("assets")),
  watch(["manifest.json"], series("manifest"));
}