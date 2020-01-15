// webpack/plugins.js
// ==================

module.exports = {
    CleanWebpackPlugin: require('clean-webpack-plugin').CleanWebpackPlugin,
    nodeExternals: require('webpack-node-externals'),
    HtmlWebpackPlugin: require('html-webpack-plugin'),
    HtmlWebpackPugPlugin: require('html-webpack-pug-plugin'),
};

