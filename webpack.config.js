"use strict";
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// TODO:
// =====
//   * Autoprefixer
//   * Babel

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
    alias: {
        '@models': path.resolve(__dirname, 'models'),
        '@client': path.resolve(__dirname, 'client'),
        '@views': path.resolve(__dirname, 'client/views'),
        '@lib': path.resolve(__dirname, 'lib'),
    },
};

const serverConfig = {//{{{
  target: "node",
  entry: {
    main: "./bin/www",
  },
  mode,
  resolve,
  plugins: [
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/server"),
  },
  module: {
    rules: [
      {
        test: /\.view\.js$/,
        use: [
          "null-loader",
        ],
      },
    ],
  },
  externals: [nodeExternals()],
};//}}}

const clientConfig = {//{{{
  target: "web",
  devtool,
  entry: {
    index: "./client/main/main.js",
  },
  mode,
  resolve,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
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
