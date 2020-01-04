// Client/menu/routerIntegration.js
// ================================

const $ = require('jquery');

module.exports = function routerIntegration(router, menuContainer, updateStatus) {

    function onPageChange(evt) {//{{{
        const options = $(".menuOption", menuContainer);
            // Not catched in order to allow dynamically adding options.
        options.removeClass("current");

        const selector = `[href="${evt.path}"]`;
        const current = options.filter(selector);

        updateStatus(false);
        current.addClass("current");

        // console.log("--- pageChange ---");
        // console.log(evt.path);
        // console.log({selector, current, options});
        // console.log("--- ---------- ---");

    };//}}}


    // Whatch for route changes:
    router.on && router.on("pageChange", onPageChange);

    // ReTrigger pageChange
    router.updateView && router.updateView();

    // Attach mainMenu links to mainRouter:
    router.attach && router.attach(menuContainer);

};
