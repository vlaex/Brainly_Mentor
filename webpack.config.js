const { glob } = require("glob");
const path = require("path");
const webpack = require("webpack");

const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

let contentScriptFiles = glob.sync("./src/views/*/*(*.ts|*.tsx|*.js|*.jsx)");
let contentScriptEntries = {};

for(let file of contentScriptFiles) {
  let fileSplitted = file.split(/\.|\//);
  let len = fileSplitted.length;

  let folderName = fileSplitted[len - 3];
  let scriptName = fileSplitted[len - 2];

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
    extensions: [".ts", ".js", ".tsx"],
    plugins: [new TsconfigPathsPlugin()]
  },
  target: "web",
  devtool: "cheap-module-source-map"
};