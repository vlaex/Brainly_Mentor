const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const { GetFiles, ExtractFolder } = require("./scripts/getFiles");

function MakeEntries(
  pattern, 
  outputFolder,
  bundleFileName,
  withFolder = true
) {
  let files = GetFiles(pattern);
  let entries = {};

  for(let file of files) {
    let bundleFile = `${outputFolder}`;
    if (withFolder) bundleFile += `/${ExtractFolder(file)}`;
    bundleFile += `/${bundleFileName}`;

    if(!entries[bundleFile]) entries[bundleFile] = [];
    entries[bundleFile].push(file);
  }

  return entries;
}

/** @type {webpack.Configuration} */
module.exports = {
  entry: {
    ...MakeEntries("./src/views/*/*(*.ts|*.tsx|*.js|*.jsx)", "content-scripts", "index", true),
    ...MakeEntries("./src/views/Inject.ts", "content-scripts", "contentScript", false)
  },
  output: {
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: "ts-loader",
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
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  target: "web",
  devtool: "inline-cheap-source-map"
};