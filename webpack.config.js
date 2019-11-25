"use strict";
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const serverConfig = {//{{{
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
};//}}}

const clientConfig = {//{{{
  target: "web",
  entry: {
    main: "./client/main/main.js",
  },
  mode: "development",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/client"),
  },
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.pug$/,
        use: [
          "pug-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          "file-loader",
        ],
      },
    ],
  },
};//}}}

module.exports = [serverConfig, clientConfig];
