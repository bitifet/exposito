// Client/main/main.js
// ===================

export default new Promise(async function(resolve, reject) {

    const {router} = await (await require('@client/router'));
    const routes = await require('@client/routes');
    const {app} = require('@client/layout');


    const mainRouter = await router(
        routes
        , window
        , app
    );

    // console.log({
    //     mainRouter,
    // });

});

