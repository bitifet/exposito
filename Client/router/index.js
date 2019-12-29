// client/router/index.js
// ======================

module.exports = Promise.resolve().then(async function(){

    const {app} = require('@client/layout');

    const routes = await require('@client/routes');
    const Router = await require('./router');
    const mainRouter = await Router(
        routes
        , window
        , app
    );

    return mainRouter;

});
