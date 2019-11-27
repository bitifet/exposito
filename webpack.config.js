"use strict";
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const mode =  (
    process.env.NODE_ENV == "production" ? "production"
    : "development"
);

const serverConfig = {//{{{
  target: "node",
  entry: {
    main: "./bin/www",
  },
  mode,
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
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
    index: "./client/main/main.js",
  },
  mode,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: "[name].[contenthash].js",
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
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
     cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

};//}}}

module.exports = [serverConfig, clientConfig];
