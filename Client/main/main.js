// Client/main/main.js
// ===================

export default new Promise(async function(resolve, reject) {

    const layout = require('@client/layout');
    const {menu} = await require('@client/menu');
    const {router} = await require('@client/router');
    const routes = await require('@client/routes');

    // Main Menu Service:
    const mainMenu = await menu(
        {}
        , layout.menu
    );

    // Main Router Service:
    const mainRouter = await router(
        routes
        , window
        , layout.app
    );

    // Attach mainMenu links to mainRouter:
    mainRouter.attach(mainMenu);

    // console.log({
    //     mainMenu,
    //     mainRouter,
    // });

});

