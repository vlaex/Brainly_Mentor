const { src, dest } = require("gulp");

const gulpMerge = require("merge-stream");
const gulpIf = require("gulp-if");
const uglify = require("gulp-uglify");
const jsonMinify = require("gulp-json-minify");

module.exports = function moveAssets() {
  let assets = [{
    src: "src/assets/*",
    dest: "assets"
  }, {
    src: "src/_locales/**/*.json",
    dest: "_locales"
  }, {
    src: "src/icons/*",
    dest: "icons"
  }, {
    src: "LICENSE",
    dest: ""
  }];

  assets = assets.map(asset => src(asset.src)
    .pipe(gulpIf(/\.js$/, uglify()))
    .pipe(gulpIf(/\.json$/, jsonMinify()))
    .pipe(dest(`build/${asset.dest}`))
  );

  return gulpMerge(assets);
}