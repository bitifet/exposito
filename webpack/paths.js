// webpack/path_aliases.js
// =======================

const path = require('path');

module.exports = {
    dists: {
        server: path.resolve(__dirname, "../dist/Server"),
        client: path.resolve(__dirname, "../dist/Client"),
    },
    aliases: {
        '@models': path.resolve(__dirname, '../models'),
        '@client': path.resolve(__dirname, '../Client'),
        '@server': path.resolve(__dirname, '../Server'),
        '@assets': path.resolve(__dirname, '../Client/Assets'),
        '@views': path.resolve(__dirname, '../Client/Views'),
        '@lib': path.resolve(__dirname, '../lib'),
    },
};
