// webpack/htmlOptions.js
// ======================

const appModel = require('../models/app.js');
module.exports = {
    title: appModel.name,
    template: 'Client/layout/layout.pug',
    appModel,
};
