const { src, task, dest, series } = require("gulp");
const gulpChange = require("gulp-change");
const mergeDeep = require("merge-deep");

const BUILD_FOLDER = "./build";

task("manifest", () => {
  const generateMarketUrls = (path) => {
    const markets = ["*://znanija.com", "*://brainly.com"];
    return markets.map(market => market + path);
  }

  const manifestData = {
    version: process.env.npm_package_version,
    content_scripts: [{
      matches: generateMarketUrls("/moderation_new/view_moderator/*"),
      js: ["content-scripts/ModeratorActions/Init.js", "assets/styleguide-icons.js"]
    }]
  };

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
  const assets = [{
    src: "./src/icons/**/*",
    buildDir: "icons"
  }, {
    src: "./src/assets/**/*",
    buildDir: "assets"
  }];

  assets.forEach(asset => {
    src(asset.src).pipe(dest(`${BUILD_FOLDER}/${asset.buildDir}`));
  });

  return src(".");
})

exports.default = series("manifest", "assets");