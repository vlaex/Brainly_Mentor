const { src, task, dest, series, watch } = require("gulp");

const gulpChange = require("gulp-change");
const mergeDeep = require("merge-deep");
const sass = require("gulp-dart-sass");
const zip = require("gulp-zip");

const { GetFiles, ExtractFolder } = require("./scripts/files");

const BUILD_FOLDER = "./build";

task("manifest", () => {
  const manifestData = { version: process.env.npm_package_version };

  return src("./manifest.json")
    .pipe(
      gulpChange(content => {
        let json = JSON.parse(content);
        return JSON.stringify(mergeDeep(json, manifestData));
      })
    )
    .pipe(dest(BUILD_FOLDER));
});

task("assets", () => {
  const assets = [
    {src: "./src/icons/**/*", buildDir: "icons"}, 
    {src: "./src/_locales/**/*", buildDir: "_locales"},
    {src: "./src/assets/*.(gif|png)", buildDir: "assets"}
  ];

  assets.forEach(asset => {
    src(asset.src).pipe(dest(`${BUILD_FOLDER}/${asset.buildDir}`));
  });

  return src(".");
});

task("sass", () => {
  let files = GetFiles("./src/styles/*/styles.scss");

  for (let file of files) {
    src(file)
      .pipe(sass({ outputStyle: "compressed" }))
      .pipe(dest(`${BUILD_FOLDER}/styles/${ExtractFolder(file)}`));
  }
  
  return src(".");
});

task("watch", () => {
  watch(["./src/styles/**/*.scss"], series("sass"));
});

task("zip", () => {
  return src(`${BUILD_FOLDER}/**`)
    .pipe(zip("build.zip"))
    .pipe(dest("./dist"));
});

exports.default = series("manifest", "assets", "sass", "watch", "zip");