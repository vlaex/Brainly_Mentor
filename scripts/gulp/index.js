const { parallel } = require("gulp");

exports.assets = require("./assets");
exports.manifest = require("./manifest");
exports.scss = require("./scss");
exports.watch = require("./watch");
exports.zip = require("./zip");

exports.default = parallel(
  exports.manifest,
  exports.assets,
  exports.scss,
  exports.watch
);