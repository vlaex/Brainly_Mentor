const { src, dest } = require("gulp");
const sass = require("gulp-dart-sass");

module.exports = function compileScss() {
  return src(["src/styles/*/styles.scss"])
    .pipe(sass({
      outputStyle: "compressed"
    }))
    .pipe(dest("build/styles"));
}