// webpack.config.js
// =================
"use strict";
const fs = require('fs');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const appModel = require('./models/app.js');
const htmlOptions = {
    title: appModel.name,
    template: 'Client/layout/layout.pug',
    appModel,
};

const shims = (function(shimPath) {//{{{
    try {
        return fs.readdirSync(shimPath)
            .filter(f=>f.match(/\.js$/))
            .map(f=>shimPath+'/'+f)
        ;
    } catch (err) {
        return [];
    };
})('./Shims');//}}}

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
    alias: {
        '@models': path.resolve(__dirname, 'models'),
        '@client': path.resolve(__dirname, 'Client'),
        '@server': path.resolve(__dirname, 'Server'),
        '@assets': path.resolve(__dirname, 'Client/Assets'),
        '@views': path.resolve(__dirname, 'Client/Views'),
        '@lib': path.resolve(__dirname, 'lib'),
    },
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
    new CleanWebpackPlugin(),
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist/Server"),
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
    index: [
      ...shims,
      "@babel/polyfill",
      "./Client/main",
    ],
  },
  mode,
  resolve,
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(htmlOptions),
    new HtmlWebpackPugPlugin({
      adjustIndent: true,
      pretty: true,
    }),
  ],
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist/Client"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
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
