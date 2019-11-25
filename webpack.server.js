"use strict";
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');


module.exports = {
  target: "node",
  entry: {
    main: "./bin/www",
  },
  mode: "development",
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/server"),
  },
  module: {
    rules: [
    ],
  },
  externals: [nodeExternals()],
};

