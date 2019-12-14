// client/router/index.js
// ======================

module.exports = Promise.resolve().then(async function(){

    const {app} = require('@client/main/layout');

    const routes = await require('@client/routes');

    const mainRouter = await require('./router');

    return mainRouter(app, routes);

});
