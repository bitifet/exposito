// Client/main/main.js
// ===================

export default new Promise(async function(resolve, reject) {

    const layout = require('@client/layout');

    const {menu} = await require('@client/menu');

    const {router} = await require('@client/router');
    const routes = await require('@client/routes');


    const mainMenu = await menu(
        {}
        , layout.menu
    );

    const mainRouter = await router(
        routes
        , window
        , layout.app
    );

    // console.log({
    //     mainMenu,
    //     mainRouter,
    // });

});

