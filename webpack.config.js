const { glob } = require("glob");
const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");

let contentScriptFiles = glob.sync("./src/views/*/*(*.ts|*.tsx|*.js|*.jsx)");
let contentScriptEntries = {};

for(let file of contentScriptFiles) {
  let fileSplitted = file.split(/\.|\//);

  let folderName = fileSplitted.at(-3);
  let scriptName = fileSplitted.at(-2);

  contentScriptEntries[`content-scripts/${folderName}/${scriptName}`] = file;
}

/** @type {webpack.Configuration} */
module.exports = {
  entry: {
    ...contentScriptEntries
  },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
      exclude: /node_modules/,
    }, {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
      exclude: /node_modules/
    }],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({ extractComments: false })
    ],
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".sass"],
  },
  target: "web",
  devtool: "cheap-module-source-map"
};