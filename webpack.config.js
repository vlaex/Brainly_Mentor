/* eslint-disable */

const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const MakeEntries = require("./scripts/makeEntries");

/** @type {webpack.Configuration} */
const config = {
  entry: {
    ...MakeEntries("./src/views/*/*(*.ts|*.tsx|*.js|*.jsx)", "content-scripts", "index", true),
    ...MakeEntries("./src/views/Inject.ts", "content-scripts", "contentScript"),
    ...MakeEntries("./src/background/*.ts", "background", "serviceWorker"),
    ...MakeEntries("./src/assets/styleguide-icons.ts", "assets", "styleguide-icons")
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
  resolve: {
    extensions: [".ts", ".js", ".tsx"],
    plugins: [
      new TsconfigPathsPlugin()
    ]
  },
  target: "web",
  devtool: "inline-cheap-source-map"
};

if (process.env.NODE_ENV === "production") {
  config.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({ 
        extractComments: false,
        terserOptions: {
          format: { comments: false }
        }
      })
    ]
  };
}

module.exports = config;