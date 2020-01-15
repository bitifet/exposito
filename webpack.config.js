// webpack.config.js
// =================
"use strict";
const fs = require('fs');
const path = require('path');
const plugins = require('./webpack/plugins');
const shims = require('./webpack/shims');
const htmlOptions = require('./webpack/htmlOptions');
const paths = require('./webpack/paths');
const rules = require('./webpack/rules');


// TODO:
// =====
//   * Autoprefixer

const mode =  (
    process.env.NODE_ENV == "production" ? "production"
    : "development"
);
const devtool = (
    mode == "production" ? "source-map"
    : "inline-source-map"
);
const resolve = {
    mainFiles: ['index', 'index.view'],
    alias: paths.aliases,
};

const serverConfig = {//{{{
  target: "node",
  entry: {
    main: [
      ...shims,
      "./Server/main",
    ],
  },
  mode,
  resolve,
  plugins: [
    new plugins.CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: paths.dists.server,
  },
  module: {
      rules: rules.server,
  },
  externals: [plugins.nodeExternals()],
};//}}}

const clientConfig = {//{{{
  target: "web",
  devtool,
  entry: {
    index: [
      ...shims,
      "@babel/polyfill",
      "./Client/main",
    ],
  },
  mode,
  resolve,
  plugins: [
    new plugins.CleanWebpackPlugin(),
    new plugins.HtmlWebpackPlugin(htmlOptions),
    new plugins.HtmlWebpackPugPlugin({
      adjustIndent: true,
      pretty: true,
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: paths.dists.client,
    publicPath: "/",
  },
  module: {
      rules: rules.client,
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
