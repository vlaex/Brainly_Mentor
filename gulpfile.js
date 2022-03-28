// eslint-disable-next-line @typescript-eslint/no-var-requires
const tasks = require("./scripts/gulp");

exports.assets = tasks.assets;
exports.manifest = tasks.manifest;
exports.scss = tasks.scss;
exports.watch = tasks.watch;
exports.zip = tasks.zip;
exports.default = tasks.default;