const { src, dest } = require("gulp");

module.exports = function moveAssets(done) {
  ["icons", "_locales", "assets"].forEach(folder => {
    src(`src/${folder}/**/*`)
      .pipe(dest(`build/${folder}`));
  });
  
  done();
}